import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { formData, text } = req.body;

    console.log("Incoming Data:", formData);

    // ✅ CALL NUMERIC MODEL (FIXED BODY)
    const numericRes = await fetch("http://127.0.0.1:5000/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // ✅ FIXED
    });

    const numericData = await numericRes.json();
    console.log("Numeric Response:", numericData);

    // ✅ CALL TEXT MODEL
    const textRes = await fetch("http://127.0.0.1:5000/api/text-predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const textData = await textRes.json();
    console.log("Text Response:", textData);

    // ✅ SMART COMBINED PROBABILITY
    const numericProb = numericData.probability || 0;
    const textProb = textData?.confidence || 0;

    // 🔥 MAIN FIX: combine both models
    const combinedProb = numericProb * 0.6 + textProb * 0.4;

    // ✅ BETTER RISK LOGIC
    let riskLevel = "low";

    if (combinedProb > 0.6) {
      riskLevel = "high";
    } else if (combinedProb > 0.3) {
      riskLevel = "medium";
    }

    // ✅ MAIN CAUSE
    let mainCause = "No major issue detected";

    if (riskLevel === "high") {
      mainCause = "High stress and emotional imbalance detected";
    } else if (riskLevel === "medium") {
      mainCause = "Moderate stress or emotional pressure detected";
    }

    // ✅ SUGGESTION
    let suggestion = "Maintain your healthy routine.";

    if (riskLevel === "high") {
      suggestion = "Please consult a counselor or talk to someone you trust.";
    } else if (riskLevel === "medium") {
      suggestion = "Try relaxation, reduce stress, and take breaks.";
    }

    // ✅ FINAL RESPONSE
    res.json({
      riskLevel,
      probability: numericProb,
      combinedProbability: combinedProb,
      mainCause,
      suggestion,
      confidence: textProb,
      textPrediction: textData?.prediction || "Neutral",
    });
  } catch (error) {
    console.error("FULL ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
