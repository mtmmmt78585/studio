"use client";

import { DollarSign, PauseCircle, PlayCircle } from "lucide-react";
import { Terminal } from "@/components/admin/Terminal";
import { users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const creatorsToPay = users.filter(u => u.isVerified).slice(0, 3);

export function PayoutsTerminal() {
  return (
    <Terminal title="Monthly Payouts" icon={DollarSign}>
        <div className="space-y-2">
            {creatorsToPay.map(user => (
                <div key={user.id} className="flex items-center justify-between p-2 rounded-lg bg-background">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={user.avatar} alt={user.username} />
                            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-sm">{user.username}</p>
                            <p className="font-mono text-xs text-green-400">$ {(user.totalViews * 0.0001 * 0.6).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 border-accent/50 text-accent hover:bg-accent/10 hover:text-amber-300">
                            <PauseCircle className="mr-2 h-4 w-4" />
                            Freeze
                        </Button>
                        <Button size="sm" className="h-8 bg-accent text-accent-foreground hover:bg-amber-400">
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Approve
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    </Terminal>
  );
}
