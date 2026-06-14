export async function POST(req) {
  try {
    const body = await req.json();
    const { formData, text } = body;

    const annResponse = await fetch("http://127.0.0.1:5000/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        text_input: text,
      }),
    });

    const annData = await annResponse.json();

    return Response.json({
      riskLevel: annData.riskLevel,
      ann_probability: annData.ann_probability,
      text_prediction: annData.text_prediction,
      text_confidence: annData.text_confidence,
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
