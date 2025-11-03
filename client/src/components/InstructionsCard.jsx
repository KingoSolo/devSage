import { Card } from './ui/card'
import { Code2, Zap, Lightbulb } from 'lucide-react'

function InstructionsCard() {
  return (
    <Card className="p-8 bg-linear-to-br from-gray-800 to-gray-900 border-blue-500/20 h-[400px] overflow-y-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-blue-600/20 rounded-lg">
          <Code2 className="h-6 w-6 text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          How to Use DevSage
        </h2>
      </div>
      
      <div className="space-y-5">
        <div className="p-2 bg-blue-950/30 rounded-lg border border-blue-500/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-600/20 rounded-md mt-1">
              <Code2 className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-300 mb-2">1. Paste Your Code</h3>
              <p className="text-sm text-gray-400">Enter or paste your JavaScript code in the editor.</p>
            </div>
          </div>
        </div>
        
        <div className="p-2 bg-purple-950/30 rounded-lg border border-purple-500/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-600/20 rounded-md mt-1">
              <Zap className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-300 mb-2">2. Click Review</h3>
              <p className="text-sm text-gray-400">Hit the button to get AI-powered feedback instantly.</p>
            </div>
          </div>
        </div>
        
        <div className="p-2 bg-green-950/30 rounded-lg border border-green-500/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-600/20 rounded-md mt-1">
              <Lightbulb className="h-4 w-4 text-green-300" />
            </div>
            <div>
              <h3 className="font-semibold text-green-200 mb-2">3. Get Insights</h3>
              <p className="text-sm text-gray-400">Receive scores, issues, and actionable suggestions.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default InstructionsCard