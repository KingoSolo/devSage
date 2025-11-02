import ReviewButton from './components/ReviewButton.jsx'
import CodeEditor from './components/CodeEditor.jsx'
import ResultsPanel from './components/ResultsPanel.jsx'
import { useState } from 'react'
import { Toaster } from './components/ui/sonner.jsx'
import { toast } from 'sonner';


const mockResponse = {
  score: 7,
  summary: "Your code is functional but could be improved.",
  issues: [
    { severity: "high", message: "No input validation" },
    { severity: "medium", message: "Variable names could be more descriptive" }
  ],
  suggestions: [
    "Add type checking for function parameters",
    "Use more descriptive variable names"
  ]
}

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReview = () => {
    console.log("Code submitted for review:", code);
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      if (Math.random() < 0.5) {
        toast.error("Failed to fetch code review. Please try again.");
        setResult(null);
      } else {
        setResult(mockResponse);
        setError(null);
      }
    setIsLoading(false);
    },2000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-300">
     <Toaster/>
      <h1 className="text-3xl">DevSage</h1>
      <div className="flex flex-col items-center gap-4">
        <CodeEditor code={code} setCode={setCode} />
        <ReviewButton onReview={handleReview} isLoading={isLoading} />
        {result && <ResultsPanel results={result} />}
        {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
    </div>
  )
}

export default App