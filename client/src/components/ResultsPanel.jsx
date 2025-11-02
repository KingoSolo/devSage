import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

function ResultsPanel({ results }) {
  return (
    <div className="w-full max-w-2xl mt-4">
      <Card className="p-4 bg-gray-800 border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Code Review Results</h2>

        <div>
            <p className="text-sm text-muted-foreground">Score: {results.score} / 10</p>
        </div>

       <div className="mb-2"> 
            <p className="text-sm text-muted-foreground">Summary</p>
            <p className="mt-1">{results.summary}</p>
        </div>
        
       <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Issues</h3>
          {results.issues.map((issue, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Badge variant={issue.severity === 'high' ? 'destructive' : 'secondary'}>
                {issue.severity}
              </Badge>
              <span>{issue.message}</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Suggestions:</h3>
          <ul className="list-disc list-inside">
            {results.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}
export default ResultsPanel;