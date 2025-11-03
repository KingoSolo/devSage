import ReviewButton from './components/ReviewButton.jsx'
import CodeEditor from './components/CodeEditor.jsx'
import ResultsPanel from './components/ResultsPanel.jsx'
import InstructionsCard from './components/InstructionsCard.jsx'
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
    <div className="min-h-screen bg-gray-900 px-20 py-6 ">
     <Toaster/>

     <div className="text-center mb-6">
        <h1 className="font-serif text-4xl font-bold bg-linear-to-r from-[#02000a] via-[#0a0625] to-[#676055] bg-clip-text text-transparent inline-block">DevSage</h1>
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