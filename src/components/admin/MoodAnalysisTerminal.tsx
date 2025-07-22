"use client"

import { Heart, Laugh, Angry, Frown } from "lucide-react";
import { Terminal } from "@/components/admin/Terminal";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const data = [
  { mood: "Happy", total: Math.floor(Math.random() * 5000) + 1000, icon: Laugh },
  { mood: "Sad", total: Math.floor(Math.random() * 5000) + 1000, icon: Frown },
  { mood: "Romantic", total: Math.floor(Math.random() * 5000) + 1000, icon: Heart },
  { mood: "Angry", total: Math.floor(Math.random() * 5000) + 1000, icon: Angry },
]

export function MoodAnalysisTerminal() {
  return (
    <Terminal title="Real-time Mood Analysis" icon={Laugh}>
        <div className="space-y-4">
            <p className="text-xs text-muted-foreground">Live analysis of user mood based on content interaction.</p>
            <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="mood"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <p className="text-xs text-center font-bold font-headline text-primary/70 animate-text-glow">VIRAL ALGORITHM ACTIVE</p>
        </div>
    </Terminal>
  );
}
