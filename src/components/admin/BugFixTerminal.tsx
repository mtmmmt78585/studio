"use client";

import { useState } from "react";
import { Bot, Zap } from "lucide-react";
import { Terminal } from "@/components/admin/Terminal";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { suggestBugFix, type SuggestBugFixOutput } from "@/ai/flows/ai-powered-bug-fix-suggestions";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function BugFixTerminal() {
  const [errorLogs, setErrorLogs] = useState("");
  const [suggestion, setSuggestion] = useState<SuggestBugFixOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorLogs) return;

    setIsLoading(true);
    setSuggestion(null);

    try {
      const result = await suggestBugFix({ errorLogs });
      setSuggestion(result);
    } catch (error) {
      console.error("Error getting bug fix suggestion:", error);
      // You could show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Terminal title="AI Bug-Fix Agent" icon={Bot}>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            placeholder="Paste error logs here... The AI will analyze and suggest a fix."
            value={errorLogs}
            onChange={(e) => setErrorLogs(e.target.value)}
            className="font-code text-xs h-32 bg-background"
            disabled={isLoading}
          />
          <Button type="submit" disabled={!errorLogs || isLoading} className="w-full">
            <Zap className="mr-2 h-4 w-4" />
            {isLoading ? "Analyzing..." : "Generate Fix"}
          </Button>
        </form>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        )}

        {suggestion && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <h4 className="font-bold font-headline">Suggested Fix:</h4>
              <Badge variant={suggestion.confidenceLevel > 0.7 ? "default" : "secondary"} className="bg-accent text-accent-foreground">
                Confidence: {(suggestion.confidenceLevel * 100).toFixed(0)}%
              </Badge>
            </div>
            <pre className="bg-background p-3 rounded-md overflow-x-auto">
              <code className="font-code text-xs text-green-400">
                {suggestion.suggestedFix}
              </code>
            </pre>
            <div>
              <h4 className="font-bold font-headline">Explanation:</h4>
              <p className="text-muted-foreground">{suggestion.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </Terminal>
  );
}
