// services/aiService.js
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.REACT_APP_HF_TOKEN,
  dangerouslyAllowBrowser: true,
});

export async function getAIResponse(message) {
  try {
    const res = await client.chat.completions.create({
      model: "HuggingFaceH4/zephyr-7b-beta:featherless-ai",
      messages: [{ role: "user", content: message }],
    });
    const choice = res?.choices?.[0];
    if (!choice) return "AI returned an unexpected response shape.";
    const msg = choice.message;
    if (typeof msg === "string") return msg;
    if (msg?.content) return msg.content;
    return JSON.stringify(choice);
  } catch (error) {
    console.error("AI Error:", error);
    return "Error: Unable to fetch AI response.";
  }
}
