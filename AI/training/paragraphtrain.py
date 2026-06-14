import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os

# === Step 1: Load Cleaned Data ===
df = pd.read_csv("cleaned_dataset.csv")

# === Step 2: Extract Text and Labels ===
texts = df['clean_text'].astype(str)
labels = df['class']

# === Step 3: Encode Labels ===
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(labels)  # suicide=1, non-suicide=0

# === Step 4: TF-IDF Vectorization ===
vectorizer = TfidfVectorizer(max_features=5000)
X = vectorizer.fit_transform(texts)

# === Step 5: Split Data ===
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# === Step 6: Train Model ===
model = LogisticRegression()
model.fit(X_train, y_train)

# === Step 7: Evaluate Model ===
y_pred = model.predict(X_test)

print("✅ Accuracy:", accuracy_score(y_test, y_pred))
print("\n📊 Classification Report:\n")
print(classification_report(y_test, y_pred, target_names=label_encoder.classes_))

# === Step 8: Save the trained model and preprocessors ===
os.makedirs("saved_models", exist_ok=True)

with open("saved_models/text_paragraph_model.pkl", "wb") as f:
    pickle.dump(model, f)
with open("saved_models/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)
with open("saved_models/label_encoder.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

print("\n✅ Saved models and preprocessors to saved_models/ folder:")
print("- text_paragraph_model.pkl")
print("- vectorizer.pkl")
print("- label_encoder.pkl")
  #this is final code for paragrapgh data