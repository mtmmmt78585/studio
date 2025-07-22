"use client";

import { useState } from "react";
import { Siren, Zap } from "lucide-react";
import { Terminal } from "@/components/admin/Terminal";
import { Button } from "@/components/ui/button";
import { detectFraud, type FraudDetectionInput, type FraudDetectionOutput } from "@/ai/flows/ai-fraud-detection";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const defaultInput: FraudDetectionInput = {
    videoId: "vid_123",
    userId: "user_xyz",
    watchTime: 5,
    likes: 0,
    comments: 0,
    skipRate: 0.9,
    mood: "neutral",
}

export function FraudDetectionTerminal() {
  const [formState, setFormState] = useState<FraudDetectionInput>(defaultInput);
  const [result, setResult] = useState<FraudDetectionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: id === 'watchTime' || id === 'likes' || id === 'comments' || id === 'skipRate' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const detectionResult = await detectFraud(formState);
      setResult(detectionResult);
    } catch (error) {
      console.error("Error detecting fraud:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Terminal title="Fraud Detection" icon={Siren}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <Label htmlFor="userId" className="text-xs">User ID</Label>
                <Input id="userId" value={formState.userId} onChange={handleInputChange} className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="videoId" className="text-xs">Video ID</Label>
                <Input id="videoId" value={formState.videoId} onChange={handleInputChange} className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="watchTime" className="text-xs">Watch Time (s)</Label>
                <Input id="watchTime" type="number" value={formState.watchTime} onChange={handleInputChange} className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="skipRate" className="text-xs">Skip Rate (0-1)</Label>
                <Input id="skipRate" type="number" step="0.1" value={formState.skipRate} onChange={handleInputChange} className="h-8 text-xs" />
            </div>
            <div className="space-y-1 col-span-2">
                <Label htmlFor="mood" className="text-xs">Mood</Label>
                 <Select onValueChange={(v: "sad" | "happy" | "romantic" | "angry" | "neutral") => setFormState(p => ({...p, mood: v}))} defaultValue="neutral" >
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="happy">Happy</SelectItem>
                        <SelectItem value="sad">Sad</SelectItem>
                        <SelectItem value="romantic">Romantic</SelectItem>
                        <SelectItem value="angry">Angry</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
            <Zap className="mr-2 h-4 w-4" />
            {isLoading ? "Scanning..." : "Scan for Fraud"}
        </Button>
        
        {isLoading && <Skeleton className="h-16 w-full" />}

        {result && (
          <div className="space-y-2 text-sm rounded-md border p-3">
             <div className="flex items-center gap-2">
                <h4 className="font-bold">Result:</h4>
                <Badge variant={result.isFraudulent ? "destructive" : "default"} className={result.isFraudulent ? "" : "bg-green-700 hover:bg-green-600"}>
                    {result.isFraudulent ? "Fraudulent View" : "Legit View"}
                </Badge>
                <Badge variant="secondary">Score: {result.fraudScore.toFixed(2)}</Badge>
            </div>
            <p className="text-muted-foreground text-xs"><span className="font-bold text-foreground">Reason:</span> {result.reason}</p>
          </div>
        )}
      </form>
    </Terminal>
  );
}
