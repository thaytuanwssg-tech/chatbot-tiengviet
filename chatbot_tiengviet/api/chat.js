import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { mode, message } = req.body;
    let systemPrompt = "Bạn là chatbot Tiếng Việt cho học sinh.";
    if (mode === "dat-cau") systemPrompt += " Hỗ trợ đặt câu đúng.";

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (e){
    res.status(500).json({ error:"Server error" });
  }
}
