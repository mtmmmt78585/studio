"use client";

import { useState } from "react";
import { Shield, Zap } from "lucide-react";
import { Terminal } from "@/components/admin/Terminal";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { moderateContent, type ModerateContentOutput } from "@/ai/flows/admin-panel-content-moderation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const communityGuidelines = `
- No hate speech or harassment.
- No graphic violence or self-harm content.
- No spam or scams.
- Respect intellectual property.
`;

export function ContentModerationTerminal() {
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<"video" | "comment">("comment");
  const [result, setResult] = useState<ModerateContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setIsLoading(true);
    setResult(null);

    try {
      const moderationResult = await moderateContent({ content, contentType, communityGuidelines });
      setResult(moderationResult);
    } catch (error) {
      console.error("Error moderating content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Terminal title="Content Moderation" icon={Shield}>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            placeholder="Enter video description or comment text to moderate..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="font-code text-xs h-24 bg-background"
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <Select onValueChange={(v: "video" | "comment") => setContentType(v)} defaultValue="comment" disabled={isLoading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comment">Comment</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={!content || isLoading} className="w-full">
              <Zap className="mr-2 h-4 w-4" />
              {isLoading ? "Analyzing..." : "Moderate"}
            </Button>
          </div>
        </form>

        {isLoading && (
            <div className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-12 w-full" />
            </div>
        )}

        {result && (
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
                <h4 className="font-bold">Result:</h4>
                <Badge variant={result.flagged ? "destructive" : "default"} className={result.flagged ? "" : "bg-green-700 hover:bg-green-600"}>
                    {result.flagged ? "Flagged" : "Approved"}
                </Badge>
                <Badge variant="secondary">Sentiment: {result.sentiment}</Badge>
            </div>
            <p className="text-muted-foreground"><span className="font-bold text-foreground">Reason:</span> {result.reason}</p>
          </div>
        )}
      </div>
    </Terminal>
  );
}
