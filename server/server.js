import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();


//openai initialization
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'DevSage API is running!' });
});

// Code review route
app.post('/api/review', async (req, res) => {
  try {
    const { code } = req.body;
    
    // Validate code
    if (!code || code.trim() === '') {
      return res.status(400).json({ error: 'Code is required' });
    }

    if (code.trim().length < 10) {
      return res.status(400).json({ error: 'Code snippet too short' });
    }

    // Call OpenAI
const prompt = `You are a very strict code reviewer with over 20 years of JavaScript experience.

Analyze the following code and provide your review in this EXACT JSON format:
{
  "score": <number 1-10>,
  "summary": "<brief summary of code quality>",
  "issues": [
    { "severity": "high|medium|low", "message": "<issue description>" }
  ],
  "suggestions": [
    "<actionable suggestion>"
  ]
}

Code to review:
${code}

Return ONLY valid JSON, no additional text.`;
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are an expert code reviewer." },
    { role: "user", content: prompt }
  ],
  temperature: 0.7,
});

const responseText = completion.choices[0].message.content;
const reviewData = JSON.parse(responseText);

res.json(reviewData);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to review code' });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { question, code, reviewContext } = req.body;
    
    // Validate
    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question is required' });
    }
    
   // Build context-aware prompt
const chatPrompt = `You are a very intelligent and helpful code review assistant. You previously reviewed this code:

CODE:
${code}

REVIEW RESULTS:
${JSON.stringify(reviewContext, null, 2)}

The user is asking: "${question}"

Provide a clear, concise answer based on the code and review context.`;

// Call OpenAI
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are an expert code reviewer assistant." },
    { role: "user", content: chatPrompt }
  ],
  temperature: 0.7,
  max_tokens: 300
});

const aiResponse = completion.choices[0].message.content;

res.json({ response: aiResponse });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});