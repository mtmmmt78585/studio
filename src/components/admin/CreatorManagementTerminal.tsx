"use client";

import { CheckCircle2, UserCheck, XCircle } from "lucide-react";
import { Terminal } from "@/components/admin/Terminal";
import { users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pendingUsers = users.filter(u => !u.isVerified).slice(0, 3);

export function CreatorManagementTerminal() {
  return (
    <Terminal title="Creator Verification" icon={UserCheck}>
      <div className="space-y-4">
        {pendingUsers.map(user => (
          <div key={user.id} className="flex items-center justify-between p-2 rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{user.username}</p>
                <p className="text-xs text-muted-foreground">{user.followers.toLocaleString()} Followers</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-foreground hover:bg-muted/50 hover:text-foreground/80">
                <XCircle />
              </Button>
               <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500 hover:bg-green-500/10 hover:text-green-400">
                <CheckCircle2 />
              </Button>
            </div>
          </div>
        ))}
        {pendingUsers.length === 0 && <p className="text-center text-sm text-muted-foreground py-4">No pending verifications.</p>}
      </div>
    </Terminal>
  );
}
