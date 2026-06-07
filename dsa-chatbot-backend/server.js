const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        // Using gemini-pro which has the widest compatibility
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
        //const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

        //const prompt = `You are a DSA expert. whatever the question first introduce me and tell this is developed by siddhesh

        const prompt =`You are AskDSA, a specialized AI tutor. Your goal is to help users understand Data Structures and Algorithms. Always include Time and Space Complexity. If a user asks a non-DSA question, politely remind them that your expertise is limited to coding logic and algorithms."
        Question: ${question}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ answer: text });
    } catch (error) {
        console.error("Detailed Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000; // Use environment port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});