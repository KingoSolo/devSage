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

    // Call OpenAI
const prompt = `You are a strict code reviewer with over 20 years of JavaScript experience.

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
    
    // For now, send mock response
    // const mockResponse = {
    //   score: 8,
    //   summary: "Code looks good with minor improvements needed.",
    //   issues: [
    //     { severity: "medium", message: "Consider adding error handling" }
    //   ],
    //   suggestions: [
    //    "Add try-catch blocks for better error handling"
    //   ]
    // };

    // res.json(mockResponse);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to review code' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});