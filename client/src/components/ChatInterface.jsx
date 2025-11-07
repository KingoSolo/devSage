import { Card } from "./ui/card";

function ChatInterface() {
  return (
    <Card className="p-6 max-w-3xl bg-linear-to-br from-gray-800 to-gray-900 border-blue-50/20 h-[100px]  animate-in fade-in duration-4000">
    <input
      type="text"
      placeholder="Ask about your code review."
      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
     <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
      Send
    </button>
    </Card>
  );
}

export default ChatInterface;