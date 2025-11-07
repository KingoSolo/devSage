import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, AlertCircle, Lightbulb, TrendingUp } from 'lucide-react'

function ResultsPanel({ results }) {
  return (
    <Card className="p-8 bg-linear-to-br from-gray-800 to-gray-900 border-green-50/20 h-[400px] overflow-y-auto animate-in fade-in duration-4000">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-600/20 rounded-lg">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold bg-linear-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Review Results
        </h2>
      </div>

      {/* Score */}
      <div className=" p-3 bg-blue-950/30 rounded-lg border border-blue-500/20">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Code Quality Score</p>
            <p className="text-xl font-bold text-blue-400">{results.score} / 10</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 p-4 bg-purple-950/30 rounded-lg border border-purple-500/20">
        <h3 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Summary
        </h3>
        <p className="text-gray-300">{results.summary}</p>
      </div>

      {/* Issues */}
      {results.issues.length > 0 ? (
      <div className="mb-6">
        <h3 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
          <AlertCircle className="h-6 w-6" />
            Issues Found ({results.issues.length})
        </h3>
        <div className="space-y-2">
            { results.issues.map((issue, index) => (
              <div key={index} className="p-3 bg-red-950/20 rounded-lg border border-red-500/20 flex items-start gap-3">
                <Badge variant={issue.severity === 'high' ? 'destructive' : 'secondary'} className={`mt-1 ${
                    issue.severity === 'high' 
                      ? 'bg-red-600 text-white' 
                      : issue.severity === 'medium'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-blue-600 text-white'
                    }`}>
                    {issue.severity.toUpperCase()}
                </Badge>
               <span className="text-gray-300 text-sm">{issue.message}</span>
              </div>
            ))
            }
        </div>
      </div>
      ): (
            <div className="p-3 bg-red-950/20 rounded-lg border border-red-500/20 flex items-start gap-3">
             <p className="text-green-300 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  No issues found! Your code looks great!
             </p>
            </div>
          )}

      {/* Suggestions */}
      <div>
        <h3 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Suggestions
        </h3>
        <ul className="space-y-2">
          {results.suggestions.map((suggestion, index) => (
            <li key={index} className="p-3 bg-green-950/20 rounded-lg border border-green-500/20 text-gray-300 text-sm flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default ResultsPanel;