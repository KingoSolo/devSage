import { Card } from "./ui/card";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

function ChatInterface({ code, reviewResult }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = async () => {
  if (!input.trim()) return;
  
  const userMessage = { role: 'user', text: input };
  setMessages([...messages, userMessage]);
  const currentInput = input;
      setInput('');
      setIsThinking(true);
  
  try {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: currentInput,
        code: code,
        reviewContext: reviewResult
      })
    });
    
    if (!response.ok) throw new Error('Failed to get response');
    
    const data = await response.json();
    const aiMessage = { role: 'assistant', text: data.response };
    setMessages(prev => [...prev, aiMessage]);
    
  } catch (error) {
    console.error('Chat error:', error);
    const errorMessage = { role: 'assistant', text: 'Sorry, I had trouble responding. Please try again.' };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsThinking(false);
  }
};

  return (
    <Card className="p-0 max-w-3xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500/20 animate-in fade-in duration-500 flex flex-col h-[500px] ">
      
     {/* Messages Area */}
<div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
  {messages.length === 0 ? (
    <p className="text-gray-400 text-center">Ask questions about your code review...</p>
  ) : (
    <>
      {messages.map((msg, index) => (
        <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
            <div 
            className={`max-w-[80%] p-4 rounded-lg ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-100'
            }`}
            >
                <p className="text-sm">{msg.text}</p>
                    </div>
                </div>
        ))}
      
      {isThinking && (
        <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                <span className="ml-2">Thinking...</span>
                </div>
            )}
            </>
        )}
        </div>
      {/* Input Area (Sticky Bottom) */}
      <div className="border-t border-gray-700 p-4">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="1"
            placeholder="Ask about your code review..."
            className="w-full p-3 pr-14 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-1.5 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition cursor-pointer"
          >
            <ArrowUp className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ChatInterface;