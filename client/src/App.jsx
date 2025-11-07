import ReviewButton from './components/ReviewButton.jsx'
import CodeEditor from './components/CodeEditor.jsx'
import ResultsPanel from './components/ResultsPanel.jsx'
import InstructionsCard from './components/InstructionsCard.jsx'
import { useState } from 'react'
import { Toaster } from './components/ui/sonner.jsx'
import { toast } from 'sonner';


// const mockResponse = {
//   score: 7,
//   summary: "Your code is functional but could be improved.",
//   issues: [
//     { severity: "high", message: "No input validation" },
//     { severity: "medium", message: "Variable names could be more descriptive" }
//   ],
//   suggestions: [
//     "Add type checking for function parameters",
//     "Use more descriptive variable names"
//   ]
// }

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReview = async () => {
    const trimmedCode = code.trim();

    if (!trimmedCode || trimmedCode === '') {
    toast.error("Please enter some code first!");
    return;
  }

  if(trimmedCode.length < 10) {
    toast.error("Please enter at least 10 characters of code for review.");
    return;
  }

  const hasCodePatterns = /function|const|let|var|class|import|export|return|if|for|while|\{|\}|\(|\)/i.test(trimmedCode);
  
  if (!hasCodePatterns) {
    toast.error("This doesn't look like JavaScript code. Please paste valid code.");
    return;
  }

  setIsLoading(true);
  setError(null);
  setResult(null);

  try {
    const response = await fetch('http://localhost:5000/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch review');
    }

    const data = await response.json();
    setResult(data);
    
  } catch (error) {
    console.error('Error:', error);
    toast.error("Failed to fetch code review. Please try again.");
    setResult(null);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-900 px-20 py-6 ">
     <Toaster/>

     <div className="text-center mb-6">
       <h1 className="font-serif text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">DevSage</h1>
    </div>

      <div className="max-w-7xl mx-auto">
    {/* Button */}
    <div className="flex justify-center mb-6">
      <ReviewButton onReview={handleReview} isLoading={isLoading} />
    </div>

    {/* Two Columns */}
    <div className="grid grid-cols-2 gap-6">
      <CodeEditor code={code} setCode={setCode} />
      {result ? <ResultsPanel results={result} /> : <InstructionsCard />}
    </div>
  </div>
        {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  )
}

export default App