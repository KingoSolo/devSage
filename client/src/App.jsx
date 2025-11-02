import ReviewButton from './components/ReviewButton.jsx'
import CodeEditor from './components/CodeEditor.jsx'
import ResultsPanel from './components/ResultsPanel.jsx'
import { useState } from 'react'


  

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

  const handleReview = () => {
    console.log("Code submitted for review:", code);
    setIsLoading(true);
    setResult(mockResponse);

    setTimeout(() => {
      setResult(mockResponse);
      setIsLoading(false);
    },2000)
  }

  return (
    
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-300">
      <h1 className="text-3xl">DevSage</h1>
      <div className="flex flex-col items-center gap-4">
        <CodeEditor code={code} setCode={setCode} />
        <ReviewButton onReview={handleReview} isLoading={isLoading} />
        {result && <ResultsPanel results={result} />}
    </div>
    </div>
  )
}

export default App