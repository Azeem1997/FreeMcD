import React, { useState } from "react";
import { getAIResponse } from "../utils/aiHelper";

const AIAssistant = ({ transactions }) => {
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!prompt.trim()) return;
        setLoading(true);

        const context = JSON.stringify(
            transactions.map((t) => ({
                customer: t.customerName || "Unknown",
                product: t.productPurchased || "Unknown Product",
                amount: Number(t.price || 0),
                date: t.purchaseDate || "Unknown Date",
            })),
            null,
            2
        );

        const finalPrompt = `You are an AI assistant analyzing reward program data.Below is the JSON data for all transactions:
                        ${context}

        User question: ${prompt}

        Please analyze the data and respond clearly and briefly using the context and.
        If the answer is not directly available, say "Not available in data."
        Instructions:
        - Respond only in simple words or sentences.
        - Do NOT return JSON, code, or objects.
        - Do NOT include [CODE], [USER], [/ASS], [/USER] or any tags.
        - Just give a short, clear answer in plain text not more than 30 words.
        `;
        const response = await getAIResponse(finalPrompt);
        setAnswer(response);
        setLoading(false);
    };

    return (
        <div className="container mt-4">
            <h4 className="text-primary mb-3">💡 AI Insights Assistant</h4>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ask AI (e.g. 'Who earned the most points?')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleAsk}>
                    {loading ? "Thinking..." : "Ask"}
                </button>
            </div>

            {answer && (
                <div
                    className="alert alert-info mt-4 p-3 fade show"
                    role="alert"
                    style={{ transition: "opacity 0.5s ease-in-out" }}
                >
                    <strong>AI says:</strong> {answer}
                </div>
            )}
        </div>
    );
};

export default AIAssistant;
