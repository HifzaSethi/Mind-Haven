import json
from email.mime import message
from linecache import cache
import os

from google.auth import default
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
from click import prompt
from flask_cors import CORS
from flask import Flask, request, jsonify
import numpy as np
import pickle
import traceback
import time
import requests
import re
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.efficientnet import preprocess_input



CACHE_FILE = "gemini_cache.json"

if not os.path.exists(CACHE_FILE):
    with open(CACHE_FILE, "w") as f:
        json.dump({}, f)

def load_cache():
    with open(CACHE_FILE, "r") as f:
        return json.load(f)

def save_cache(cache):
    with open(CACHE_FILE, "w") as f:
        json.dump(cache, f, indent=2)

def create_cache_key(cause, emotion, risk):
    return f"{cause}_{emotion}_{risk}".lower()
# =========================
# APP INIT
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)

CORS(app)   # ✅ THIS LINE IS MISSING
# =========================
# MODELS
# =========================
SAVED_MODELS_DIR = os.path.join(BASE_DIR, "saved_models")

ann_model = load_model(os.path.join(SAVED_MODELS_DIR, "ann_depression_model.h5"))
fer_model = load_model(os.path.join(SAVED_MODELS_DIR, "final_model.keras"))

with open(os.path.join(SAVED_MODELS_DIR, "text_paragraph_model.pkl"), "rb") as f:
    nlp_model = pickle.load(f)

with open(os.path.join(SAVED_MODELS_DIR, "vectorizer.pkl"), "rb") as f:
    vectorizer = pickle.load(f)

# =========================
# CONSTANTS
# =========================
emotion_map = {
    0: "angry",
    1: "fearful",
    2: "happy",
    3: "neutral",
    4: "sad"
}

emotion_score_map = {
    "happy": 1,
    "neutral": 0,
    "angry": -1,
    "sad": -1,
    "fearful": -1
}

# =========================
# SAFE HELPERS
# =========================
def safe_float(v, default=0.0):
    try:
        return float(v)
    except:
        return default


def validate_input(data):
    required = [
        "gender", "age", "academic_pressure", "work_pressure",
        "academic_performance", "study_satisfaction",
        "job_satisfaction", "sleeping_hours",
        "dietary_habits", "suicidal_thoughts",
        "work_study_hours", "financial_stress",
        "family_mental_illness"
    ]

    missing = [f for f in required if f not in data]

    if missing:
        return False, f"Missing fields: {missing}"

    return True, None


# =========================
# PREPROCESS NUMERIC
# =========================
# def preprocess_numeric(data):

#     gender = 1 if str(data.get("gender")).lower() == "male" else 0

#     profession = 0.5  # neutral placeholder (IMPORTANT FIX)

#     return np.array([[
#         gender,
#         float(data["age"]),
#         float(data["academic_pressure"]),
#         float(data["work_pressure"]),
#         float(data["academic_performance"]),
#         float(data["study_satisfaction"]),
#         1 - float(data["job_satisfaction"]),
#         float(data["sleeping_hours"]),
#         float(data["dietary_habits"]),
#         float(data["suicidal_thoughts"]),
#         float(data["work_study_hours"]),
#         float(data["financial_stress"]),
#         float(data["family_mental_illness"]),
#         profession   # 👈 ADD THIS BACK
#     ]])
def preprocess_numeric(data):

    gender = 1 if str(data.get("gender", "")).lower() == "male" else 0

    profession = 0.5

    values = [
        gender,
        safe_float(data.get("age")),
        safe_float(data.get("academic_pressure")),
        safe_float(data.get("work_pressure")),
        safe_float(data.get("academic_performance")),
        safe_float(data.get("study_satisfaction")),
        1 - safe_float(data.get("job_satisfaction")),
        safe_float(data.get("sleeping_hours")),
        safe_float(data.get("dietary_habits")),
        safe_float(data.get("suicidal_thoughts")),
        safe_float(data.get("work_study_hours")),
        safe_float(data.get("financial_stress")),
        safe_float(data.get("family_mental_illness")),
        profession
    ]

    arr = np.array([values], dtype=np.float32)

    print("ANN INPUT SHAPE:", arr.shape)
    print("ANN INPUT:", arr)

    return arr
# =========================
# NLP SAFE
# =========================
def analyze_text(text):

    if not text:
        return "unknown", "No text provided", 0.2

    try:
        vec = vectorizer.transform([text])
        pred = nlp_model.predict(vec)[0]

        label_map = {
            0: "positive",
            1: "stressed",
            2: "anxious",
            3: "sad"
        }

        label = label_map.get(pred, "unknown")

        if label == "sad":
            return label, "Emotional heaviness detected", 0.8
        elif label == "stressed":
            return label, "Mental pressure detected", 0.7
        elif label == "anxious":
            return label, "Anxiety signals present", 0.75
        else:
            return label, "Stable emotional state", 0.2

    except:
        return "unknown", "Text analysis failed", 0.2


# =========================
# IMAGE SAFE
# =========================
# def analyze_image(img_file):

#     if img_file is None:
#         return "neutral", 0

#     try:
#         img = image.load_img(img_file, target_size=(224, 224))
#         img_array = image.img_to_array(img)
#         img_array = np.expand_dims(img_array, axis=0)
#         img_array = preprocess_input(img_array)

#         preds = fer_model.predict(img_array)
#         emotion_index = np.argmax(preds)

#         emotion = emotion_map.get(emotion_index, "neutral")
#         score = emotion_score_map.get(emotion, 0)

#         return emotion, score

#     except:
#         return "neutral", 0
from PIL import Image
def analyze_image(img_file):
    print("FILES:", request.files)
    print("FORM:", request.form)
    if img_file is None:
        return "neutral", 0

    try:
        img = Image.open(img_file).convert("RGB")

        processed = preprocess_image(img)

        preds = fer_model.predict(processed)[0]

        predicted_class = ["angry", "fearful", "happy", "neutral", "sad"][np.argmax(preds)]

        score = emotion_score_map.get(predicted_class, 0)

        return predicted_class, score

    except Exception as e:
        print("IMAGE ERROR:", str(e))
        return "neutral", 0


IMG_SIZE = (160, 160)

def preprocess_image(img):
    img = img.resize(IMG_SIZE)
    img = np.array(img)

    if img.shape[-1] == 4:
        img = img[:, :, :3]

    img = preprocess_input(img)
    img = np.expand_dims(img, axis=0)

    return img
# =========================
# CAUSES
# =========================
def extract_main_causes(data):

    causes = []
    positives = []

    # WORK PRESSURE
    if safe_float(data.get("work_pressure")) > 7:
        causes.append("high work pressure")
    elif safe_float(data.get("work_pressure")) < 4:
        positives.append("manageable work pressure")

    # ACADEMIC
    if safe_float(data.get("academic_pressure")) > 7:
        causes.append("academic pressure")
    elif safe_float(data.get("academic_pressure")) < 4:
        positives.append("healthy academic balance")

    # JOB
    job = safe_float(data.get("job_satisfaction"))

    if job < 4:
        causes.append("low job satisfaction")
    elif job > 7:
        positives.append("good job satisfaction")

    # SLEEP
    sleep = safe_float(data.get("sleeping_hours"))

    if sleep < 5:
        causes.append("lack of sleep")
    elif sleep > 9:
        causes.append("too much sleep")
    elif 7 <= sleep <= 8:
        positives.append("healthy sleep routine")

    # FINANCIAL
    financial = safe_float(data.get("financial_stress"))

    if financial > 7:
        causes.append("financial stress")
    elif financial < 4:
        positives.append("financial stress is under control")

    # SUICIDAL THOUGHTS
    suicidal = safe_float(data.get("suicidal_thoughts"))

    if suicidal > 6:
        causes.append("disturbing thoughts")
    elif suicidal < 3:
        positives.append("emotionally safer thought patterns")

    # FAMILY HISTORY
    family = safe_float(data.get("family_mental_illness"))

    if family > 5:
        causes.append("family mental health history")

    return causes, positives
   

    
# def consistency_check(text_label, emotion):

#     negative = ["sad", "stressed", "anxious"]

#     if emotion == "happy" and text_label in negative:
#         return "Mismatch detected", "You appear okay externally, but your words suggest inner struggle."

#     if emotion in ["sad", "angry", "fearful"] and text_label in negative:
#         return "Consistent", "Your emotions and expressions align."

#     return "Consistent", ""
def consistency_check(text_label, emotion, risk_level):

    negative_text = ["sad", "stressed", "anxious"]
    positive_text = ["positive"]

    negative_emotions = ["sad", "angry", "fearful"]
    positive_emotions = ["happy", "neutral"]

    high_risk = risk_level in ["High", "Moderate"]
    low_risk = risk_level == "Low"

    negative_count = 0
    positive_count = 0

    # TEXT
    if text_label in negative_text:
        negative_count += 1
    elif text_label in positive_text:
        positive_count += 1

    # EMOTION
    if emotion in negative_emotions:
        negative_count += 1
    elif emotion in positive_emotions:
        positive_count += 1

    # NUMERIC RISK
    if high_risk:
        negative_count += 1
    elif low_risk:
        positive_count += 1

    # FINAL LOGIC

    if negative_count == 3:
        return (
            "Consistent Negative",
            "Your written thoughts, facial emotions, and mental health indicators all reflect emotional distress."
        )

    if positive_count == 3:
        return (
            "Consistent Positive",
            "Your emotional state appears stable across thoughts, expressions, and behavioral indicators."
        )

    if negative_count == 2 and positive_count == 1:
        return (
            "Emotional Conflict",
            "Some parts of your emotional state appear conflicted. You may be struggling internally while trying to appear emotionally stable."
        )

    if positive_count == 2 and negative_count == 1:
        return (
            "Mixed Signals",
            "There are slight emotional inconsistencies between your responses and expressions."
        )

    return (
        "Unclear Emotional State",
        "Your emotional indicators appear mixed and difficult to interpret clearly."
    )
def generate_message(score, causes, consistency_msg):

    if score > 70:
        base = "You seem to be going through a difficult emotional phase."
    elif score > 40:
        base = "You are showing signs of stress and emotional pressure."
    else:
        base = "You seem to be in a relatively stable emotional state."

    # 🎯 CAUSE-BASED SUPPORT
    if "financial stress" in causes:
        base += " Financial pressure can feel overwhelming, but small steps can help."

    if "high work pressure" in causes:
        base += " Try taking breaks and managing workload gradually."

    if "lack of sleep" in causes:
        base += " Improving sleep can strongly improve your mood."

    if "too much sleep" in causes:
        base += " Excessive sleep can be a sign of mental fatigue."

    if "disturbing thoughts" in causes:
        base += " Please consider talking to someone you trust."

    if consistency_msg:
        base += " " + consistency_msg

    base += " Remember, you're not alone and things can improve."

    return base
# =========================
# MAIN API
# =========================
@app.route("/api/full-analysis", methods=["POST"])
def full_analysis():

    try:
        data = request.form.to_dict(flat=True)
        text = data.get("text", "")
        img_file = request.files.get("image")

        # VALIDATION
        valid, error = validate_input(data)
        if not valid:
            return jsonify({"error": error}), 400

        # =========================
        # ANN MODEL
        # =========================
        numeric_input = preprocess_numeric(data)
        ann_pred = float(ann_model.predict(numeric_input)[0][0])

        # =========================
        # NLP MODEL (FIXED)
        # =========================
        text_label, text_analysis, text_score = analyze_text(text)
        text_score = float(text_score)

        # =========================
        # IMAGE MODEL (FIXED)
        # =========================
        emotion, emotion_score = analyze_image(img_file)
        emotion_score = float(emotion_score)

        # =========================
        # FINAL SCORE
        # =========================
        final_score = (
            (ann_pred * 0.5) +
            (text_score * 0.3) +
            ((1 - (emotion_score + 1) / 2) * 0.2)
        ) * 100

        final_score = float(final_score)

        # =========================
        # RISK
        # =========================
        risk = "High" if final_score > 70 else "Moderate" if final_score > 40 else "Low"

        # =========================
        # CAUSES
        # =========================
        causes, positives = extract_main_causes(data)
        primary_cause = causes[0] if len(causes) > 0 else "No major cause detected"
        # =========================
        # CONSISTENCY
        # =========================
        consistency, msg = consistency_check(
    text_label,
    emotion,
    risk
)

        # =========================
        # MESSAGE
        # =========================
        message = generate_message(final_score, causes, msg)

        # =========================
        # RESPONSE (SAFE JSON)
        # =========================
        return jsonify({
            "final_score": float(round(final_score, 2)),
            "risk_level": str(risk),
            "emotion_detected": str(emotion),
            "text_analysis": str(text_analysis),
            "main_causes": list(causes),
            "primary_cause": str(primary_cause),    
            "message": str(message),
            "positive_signs": list(positives),

    # ✅ KEEP BOTH
            "consistency_check": str(consistency),
            "consistency_message": str(msg),
        })
  
   
    except Exception as e:
        print(traceback.format_exc()) 

        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500


# RUN SERVER
# =========================


# ⚠️ CHANGE THIS TO A WORKING MODEL

# =========================
# LOCAL LLM
# =========================

def call_local_llm(prompt):

    url = "http://127.0.0.1:1234/v1/chat/completions"

    payload = {
    "model": "qwen2.5-3b-instruct",
    "messages": [
        {
            "role": "system",
            "content": "You are a supportive mental health AI assistant. Return ONLY valid JSON."
        },
        {
            "role": "user",
            "content": prompt
        }
    ],
    "temperature": 0.7,
    "max_tokens": 700
}

    response = requests.post(
        url,
        json=payload,
        timeout=300
    )

    if response.status_code != 200:
        print(response.text)
        raise Exception("LLM request failed")

    result = response.json()

    return result["choices"][0]["message"]["content"]


# =========================
# GUIDANCE API
# =========================

# @app.route("/api/guidance", methods=["POST"])
# def get_guidance():

#     print("GUIDANCE API HIT")

#     data = request.get_json(force=True)

#     cause = data.get("cause", "")
#     emotion = data.get("emotion", "")
#     risk = data.get("risk", 0)

#     try:
#         prompt = f"""
# You are an Islamic emotional healing assistant.

# Create deeply personalized guidance.

# USER CONDITION:
# - Main Cause: {cause}
# - Emotion: {emotion}
# - Risk Level: {risk}

# VERY IMPORTANT:

# 1. EVERYTHING must directly relate to the user's condition.
# 2. If cause is financial stress:
#    - discuss patience, rizq, reliance on Allah
# 3. If cause is lack of sleep:
#    - discuss emotional exhaustion and rest
# 4. If cause is academic pressure:
#    - discuss hope, balance, and effort
# 5. If cause is disturbing thoughts:
#    - discuss emotional healing and seeking support

# STRICT OUTPUT RULES:
# - Return ONLY valid JSON
# - NO markdown
# - NO Arabic
# - NO fake stories
# - NO random Prophet stories
# - Story MUST emotionally match user condition
# - Story MUST be authentic Islamic history
# - Story should feel emotional and comforting
# - Do NOT leave any section empty

# RETURN THIS EXACT JSON:

# {{
#   "islamic_quote": "",
#   "supportive_story": "",
#   "morning_routine": [],
#   "evening_routine": [],
#   "things_to_avoid": []
# }}

# SECTION RULES:

# islamic_quote:
# - One authentic Quran verse or Hadith in English
# - Related to user's struggle

# supportive_story:
# - 8-12 meaningful lines
# - Deep emotional storytelling
# - ONLY authentic Islamic personalities
# - Match user condition emotionally

# morning_routine:
# - EXACTLY 4 practical steps

# evening_routine:
# - EXACTLY 4 practical steps

# things_to_avoid:
# - EXACTLY 4 relevant things
# """
      
#         # =========================
# # CACHE
# # =========================
# cache = load_cache()
# key = create_cache_key(cause, emotion, risk)

# if key in cache:
#     print("⚡ Using cached response")

#     return jsonify({
#         "success": True,
#         "data": cache[key]
#     })

# # =========================
# # CALL LLM
# # =========================
# content = call_local_llm(prompt)

# print("RAW RESPONSE:", content[:300])

# content = content.replace("```json", "").replace("```", "").strip()

# json_match = re.search(r"\{.*\}", content, re.DOTALL)

# if not json_match:
#     raise ValueError("No JSON found")

# parsed = json.loads(json_match.group())

# # =========================
# # REQUIRED FIELDS
# # =========================
# required_fields = [
#     "islamic_quote",
#     "supportive_story",
#     "morning_routine",
#     "evening_routine",
#     "things_to_avoid"
# ]

# for field in required_fields:

#     if field not in parsed:

#         if field in [
#             "morning_routine",
#             "evening_routine",
#             "things_to_avoid"
#         ]:
#             parsed[field] = []

#         else:
#             parsed[field] = ""

# # =========================
# # DEFAULT FALLBACKS
# # =========================
# if not parsed["morning_routine"]:

#     parsed["morning_routine"] = [
#         "Pray Fajr on time",
#         "Drink water after waking",
#         "Spend 5 quiet minutes reflecting",
#         "Avoid social media immediately after waking"
#     ]

# if not parsed["evening_routine"]:

#     parsed["evening_routine"] = [
#         "Reduce screen exposure before sleep",
#         "Read a few Quran verses calmly",
#         "Reflect on your emotions peacefully",
#         "Sleep at a consistent time"
#     ]

# if not parsed["things_to_avoid"]:

#     parsed["things_to_avoid"] = [
#         "Negative self-talk",
#         "Isolation",
#         "Overthinking at night",
#         "Comparing yourself to others"
#     ]

# # =========================
# # FORCE LIST TYPES
# # =========================
# for field in [
#     "morning_routine",
#     "evening_routine",
#     "things_to_avoid"
# ]:

#     if not isinstance(parsed[field], list):

#         parsed[field] = [str(parsed[field])]

# # =========================
# # SAVE CACHE
# # =========================
# # =========================
# # SAVE CACHE
# # =========================
# cache[key] = parsed
# save_cache(cache)

# print("✅ Saved to cache")

# # =========================
# # SUCCESS RESPONSE
# # =========================
# return jsonify({
#     "success": True,
#     "data": parsed
# })

# # =========================
# # ERROR HANDLING
# # =========================
# except Exception as e:
#     print("🔥 REAL ERROR:")
#     print(traceback.format_exc())

#     fallback = {
#         "islamic_quote":
#         "\"Verily, with hardship comes ease.\" (Quran 94:6)",

#         "supportive_story":
#         (
#             "Prophet Ayyub (AS) lost his health, wealth, and loved ones. "
#             "People slowly distanced themselves from him, yet he never lost trust in Allah. "
#             "Years passed in pain and loneliness, but his heart remained patient. "
#             "He continued making dua softly with hope instead of anger. "
#             "Eventually Allah restored his health, family, and peace. "
#             "Sometimes healing comes slowly, but Allah never abandons a suffering heart."
#         ),

#         "morning_routine": [
#             "Pray Fajr peacefully without rushing",
#             "Drink water and avoid your phone for 15 minutes",
#             "Take deep breaths and sit in sunlight briefly",
#             "Begin your day with one realistic goal"
#         ],

#         "evening_routine": [
#             "Reduce screen exposure before sleep",
#             "Pray Isha calmly and slowly",
#             "Read a few Quran verses or duas",
#             "Sleep with gratitude instead of overthinking"
#         ],

#         "things_to_avoid": [
#             "Negative self-talk",
#             "Late-night overthinking",
#             "Emotional isolation",
#             "Comparing your journey to others"
#         ]
#     }

#     return jsonify({
#         "success": False,
#         "data": fallback
#     })
@app.route("/api/guidance", methods=["POST"])
def get_guidance():

    print("GUIDANCE API HIT")

    try:
        data = request.get_json(force=True)

        cause = data.get("cause", "")
        emotion = data.get("emotion", "")
        risk = data.get("risk", 0)

        prompt = f"""
You are an Islamic emotional healing assistant.

TASK:
Generate personalized emotional guidance.

IMPORTANT RULES:
- English only
- Warm, supportive tone
- Output MUST be valid JSON only (no extra text)

STRICT JSON RULES:
- No comments
- No trailing commas
- No markdown formatting
- Must be directly parsable by json.loads()

USER DATA:
- Main Cause: {cause}
- Emotion: {emotion}
- Risk Level: {risk}

RETURN EXACTLY THIS JSON STRUCTURE:

{{
  "islamic_quote": "string",
  "supportive_story": "string",
  "morning_routine": ["step1", "step2", "step3", "step4"],
  "evening_routine": ["step1", "step2", "step3", "step4"],
  "things_to_avoid": ["item1", "item2", "item3", "item4"]
}}
"""

        # =========================
        # CACHE (INSIDE FUNCTION)
        # =========================
        cache = load_cache()
        key = create_cache_key(cause, emotion, risk)

        if key in cache:
            print("⚡ Using cached response")
            return jsonify({
                "success": True,
                "data": cache[key]
            })

        # =========================
        # CALL LLM
        # =========================
        content = call_local_llm(prompt)

        print("RAW RESPONSE:", content[:300])

        content = content.replace("```json", "").replace("```", "").strip()

        json_match = re.search(r"\{.*\}", content, re.DOTALL)

        if not json_match:
            raise ValueError("No JSON found")

        parsed = json.loads(json_match.group())

        print("MORNING:", parsed.get("morning_routine"))
        print("EVENING:", parsed.get("evening_routine"))

        # =========================
        # SAFE FALLBACKS
        # =========================
        parsed["morning_routine"] = parsed.get("morning_routine") or [
            "Pray Fajr on time",
            "Drink water after waking",
            "Spend 5 quiet minutes reflecting",
            "Avoid social media immediately after waking"
        ]

        parsed["evening_routine"] = parsed.get("evening_routine") or [
            "Reduce screen exposure before sleep",
            "Read Quran calmly",
            "Reflect on your day",
            "Sleep early"
        ]

        parsed["things_to_avoid"] = parsed.get("things_to_avoid") or [
            "Negative self-talk",
            "Overthinking",
            "Isolation",
            "Comparing yourself to others"
        ]

        # =========================
        # FORCE LIST TYPE
        # =========================
        for field in ["morning_routine", "evening_routine", "things_to_avoid"]:
            if not isinstance(parsed[field], list):
                parsed[field] = [str(parsed[field])]

        # =========================
        # SAVE CACHE
        # =========================
        cache[key] = parsed
        save_cache(cache)

        print("✅ Saved to cache")

        return jsonify({
            "success": True,
            "data": parsed
        })

    except Exception as e:
        print("🔥 REAL ERROR:")
        print(traceback.format_exc())

        fallback = {
            "islamic_quote": "\"Verily, with hardship comes ease.\" (Quran 94:6)",
            "supportive_story": "Prophet Ayyub (AS) was a man of immense patience and deep faith in Allah. He was tested with severe illness, loss of wealth, and the separation from his loved ones. Despite years of hardship, he never complained and always remained grateful to Allah. Even in the darkest moments, his heart stayed firm in trust and hope. Finally, Allah rewarded his patience and healed him, restoring everything he had lost. His story teaches that patience in hardship brings relief and Allah never forgets those who endure with faith.",
            "morning_routine": [],
            "evening_routine": [],
            "things_to_avoid": []
        }

        return jsonify({
            "success": False,
            "data": fallback
        })
# @app.route("/api/guidance", methods=["POST"])
# def get_guidance():

#     print("GUIDANCE API HIT")

#     data = request.get_json(force=True)

#     cause = data.get("cause", "")
#     emotion = data.get("emotion", "")
#     risk = data.get("risk", 0)

#     try:
#         prompt = f"""
# You are an Islamic emotional healing assistant.

# You MUST generate STRICTLY relevant, emotionally accurate guidance.

# USER DATA:
# - Main Cause: {cause}
# - Emotion: {emotion}
# - Risk Level: {risk}

# CRITICAL RULES:
# 1. EVERYTHING must directly match the MAIN CAUSE
# 2. Do NOT add random stories
# 3. Story MUST be:
#    - Real Islamic figure only (Prophet, Sahaba, righteous scholars)
#    - Historically accurate
#    - Emotionally aligned with user's struggle
# 4. ONE Quran verse OR authentic Hadith ONLY
# 5. No extra filler text
# 6. No generic advice

# MATCHING RULES:
# - If cause = financial stress → rizq, patience, trust in Allah
# - If cause = academic pressure → effort, balance, tawakkul
# - If cause = family issues → sabr, forgiveness
# - If cause = mental stress → healing, dua, peace

# OUTPUT FORMAT (STRICT JSON ONLY):

# {{
#   "islamic_quote": "",
#   "supportive_story": "",
#   "morning_routine": ["", "", "", ""],
# "evening_routine": ["", "", "", ""],
# "things_to_avoid": ["", "", "", ""]
# }}
# """
        
#         # =========================
#         # CACHE
#         # =========================
# cache = load_cache()
# key = create_cache_key(cause, emotion, risk)

# if key in cache:
#       print("⚡ Using cached response")
#     return jsonify({
#                 "success": True,
#                 "data": cache[key]
#             })

#         # =========================
#         # CALL LLM
#         # =========================
#   content = call_local_llm(prompt)

#         print("RAW RESPONSE:", content[:300])

#         content = content.replace("```json", "").replace("```", "").strip()

#         json_match = re.search(r"\{.*\}", content, re.DOTALL)

#         if not json_match:
#             raise ValueError("No JSON found")

#         parsed = json.loads(json_match.group())
#         print("MORNING:", parsed.get("morning_routine"))
#         print("EVENING:", parsed.get("evening_routine"))
#         if cause and cause.lower() not in parsed["supportive_story"].lower():
#          parsed["supportive_story"] = fallback["supportive_story"]
#         # =========================
#         # REQUIRED FIELDS
#         # =========================
#         required_fields = [
#             "islamic_quote",
#             "supportive_story",
#             "morning_routine",
#             "evening_routine",
#             "things_to_avoid"
#         ]

#         for field in required_fields:
#             if field not in parsed:
#                 parsed[field] = [] if field != "islamic_quote" and field != "supportive_story" else ""

#         # =========================
#         # DEFAULTS
#         # =========================
# #         if not parsed["morning_routine"]:
# #             parsed["morning_routine"] = [
# #                 "Pray Fajr on time",
# #                 "Drink water after waking",
# #                 "Spend 5 quiet minutes reflecting",
# #                 "Avoid social media immediately after waking"
# #             ]

# #         if not parsed["evening_routine"]:
# #             parsed["evening_routine"] = [
# #                 "Reduce screen exposure before sleep",
# #                 "Read a few Quran verses calmly",
# #                 "Reflect on your emotions peacefully",
# #                 "Sleep at a consistent time"
# #             ]

# #         if not parsed["things_to_avoid"]:
# #             parsed["things_to_avoid"] = [
# #                 "Negative self-talk",
# #                 "Isolation",
# #                 "Overthinking at night",
# #                 "Comparing yourself to others"
# #             ]
# #         def fix_list(field, default):
# #          if not isinstance(parsed.get(field), list):
# #           parsed[field] = default
# #          else:
# #           parsed[field] = [x for x in parsed[field] if isinstance(x, str) and x.strip()]
# #         if len(parsed[field]) == 0:
# #             parsed[field] = default
# #             fix_list("morning_routine", [
# #     "Pray Fajr on time",
# #     "Drink water after waking",
# #     "Spend 5 quiet minutes reflecting",
# #     "Avoid social media immediately after waking"
# # ])

# #             fix_list("evening_routine", [
# #     "Reduce screen before sleep",
# #     "Read Quran calmly",
# #     "Reflect on your day",
# #     "Sleep early"
# # ])

# #             fix_list("things_to_avoid", [
# #     "Negative self-talk",
# #     "Overthinking",
# #     "Isolation",
# #     "Comparing yourself to others"
# # ])
#     parsed["morning_routine"] = parsed.get("morning_routine") or [
#     "Pray Fajr on time",
#     "Drink water after waking",
#     "Spend 5 quiet minutes reflecting",
#     "Avoid social media immediately after waking"
# ]

#     parsed["evening_routine"] = parsed.get("evening_routine") or [
#     "Reduce screen exposure before sleep",
#     "Read Quran calmly",
#     "Reflect on your day",
#     "Sleep early"
# ]

#     parsed["things_to_avoid"] = parsed.get("things_to_avoid") or [
#     "Negative self-talk",
#     "Overthinking",
#     "Isolation",
#     "Comparing yourself to others"
# ]
#         # =========================
#         # FORCE LIST TYPES
#         # =========================
#     for field in ["morning_routine", "evening_routine", "things_to_avoid"]:
#             if not isinstance(parsed[field], list):
#                 parsed[field] = [str(parsed[field])]

#         # =========================
#         # SAVE CACHE
#         # =========================
#     cache[key] = parsed
#     save_cache(cache)

#     print("✅ Saved to cache")

#     return jsonify({
#             "success": True,
#             "data": parsed
#         })

# except Exception as e:
#         print("🔥 REAL ERROR:")
#         print(traceback.format_exc())

#         fallback = {
#             "islamic_quote": "\"Verily, with hardship comes ease.\" (Quran 94:6)",
#             "supportive_story": "Prophet Ayyub (AS) story...",
#             "morning_routine": [],
#             "evening_routine": [],
#             "things_to_avoid": []
#         }

#         return jsonify({
#             "success": False,
#             "data": fallback
#         })
# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app.run(debug=True)
