// let chunks = ["sk", "proj", "ybWHAZPb8", "tPGKcXMTXjbwpp5zpb3G", "KbnhpSoV", "Cqp5d668vZi5DMGQRGbSGXCFnN0JN_Isf","T3BlbkFJLUNPXXBBwnFDFoLQJjah","734aK5_oiutTMBuxBEbDAi6cNL","KBEyrcv4rbYiKHjPA1ftaTkbgA"]

/**
 * API key chunks for OpenRouter authentication
 * @type {string[]}
 */

/**
 * The origin URL for the API referer header
 * @type {string}
*/

/**
 * Fetches an AI response from OpenRouter API using GPT-like model
 * 
 * Sends a user message to the OpenRouter API and returns the AI-generated response.
 * Uses the Qwen-2.5-7B-Instruct model for text generation.
 * 
 * @async
 * @function
 * @param {string} message - The user's prompt/question for the AI
 * @returns {Promise<string>} The AI's response message, or an error message if the request fails
 * @throws {Error} Logs error to console but returns error message string instead of throwing
 * 
 * @example
 * const response = await getAIResponse("What are the top spending customers?");
 * console.log(response); // AI's analysis of spending patterns
*/

let chunks = ["sk", "or", "v1", "a17f5cc87962df2f5aad96651c502d180b75c808b716bc494ce2f960892033d4"]
const referer = window.location.origin;
export async function getAIResponse(message) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${chunks.join("-")}`,
        "HTTP-Referer": referer,
        "X-Title": "Rewards App",
      },
      body: JSON.stringify({
        model: "qwen/qwen-2.5-7b-instruct",
        messages: [{ role: "user", content: message }],
      }),
    });
    const data = await res.json();
    const msg = data?.choices?.[0]?.message?.content;

    if (!msg) return "AI returned empty response.";
    return msg;
  } catch (error) {
    console.error("AI Error:", error);
    return "Error: Unable to fetch AI response.";
  }
}
