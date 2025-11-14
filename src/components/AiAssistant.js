import React, { useState } from "react";
import { getAIResponse } from "../utils/aiHelper";

const AIAssistant = ({ transactions }) => {
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!prompt.trim()) return;
        setLoading(true);

        const context = transactions
            .map(
                (t) =>
                    `"${t.customerName} bought ${t.productPurchased} for $${t.price} on ${t.purchaseDate} with ${t.rewardPoints} points."`
            )
            .join("\n");

        const finalPrompt = `You are an AI assistant analyzing reward program data.Below is the JSON data for all transactions:
                        ${context}

        User question Is: ${prompt}

        Please analyze the data and respond clearly in 30 words and briefly using the context and.
        If the answer is not directly available, say "Not available in data."
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
