import ReviewButton from './components/ReviewButton.jsx'
import CodeEditor from './components/CodeEditor.jsx'
import ResultsPanel from './components/ResultsPanel.jsx'
import ChatInterface from './components/ChatInterface.jsx'
import InstructionsCard from './components/InstructionsCard.jsx'
import { parse } from '@babel/parser'
import { useState } from 'react'
import { Toaster } from './components/ui/sonner.jsx'
import { toast } from 'sonner';


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

try {
  const wrappedCode = `(()=>{ ${trimmedCode} })()`;
  parse(wrappedCode, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });
} catch {
  toast.error("This doesn't look like valid JavaScript or JSX code.");
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
    <div className="min-h-screen  bg-gray-900 px-20 py-6 ">
     <Toaster/>

  <div className="sticky top-0 z-50 bg-gray-900 pb-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="font-serif text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">DevSage</h1>
      </div>

       
      {/* Button */}
      <div className="flex justify-center mb-6">
        <ReviewButton onReview={handleReview} isLoading={isLoading} />
      </div>
  
    </div>

    <div className="max-w-7xl mx-auto">

    {/* Two Columns */}
    <div className="grid grid-cols-2 gap-6">
      <CodeEditor code={code} setCode={setCode} />
      {result ? <ResultsPanel results={result} /> : <InstructionsCard />}
    </div>

    {/* Chat Interface */}
    <div className="mt-8  mx-auto">
      {result && <ChatInterface />}
    </div>
  </div>
        {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  )
}

export default App