import { Card } from "./ui/card";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
  if (!input.trim()) return;  // Don't send empty messages
  
  // Add user message to chat
  const userMessage = { role: 'user', text: input };
  setMessages([...messages, userMessage]);
  
  // Clear input
  setInput('');
  
  // TODO: Call backend here
  console.log('Sending to backend:', input);
};

  return (
    <Card className="p-0 max-w-3xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500/20 animate-in fade-in duration-500 flex flex-col h-[500px] ">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">Ask questions about your code review...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index}>
              {/* We'll add message bubbles here next */}
              <p>{msg.text}</p>
            </div>
          ))
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
            className="absolute right-2 bottom-2 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition"
          >
            <ArrowUp className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ChatInterface;