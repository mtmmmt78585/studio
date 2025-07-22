import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type TerminalProps = {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
};

export function Terminal({ title, icon: Icon, children, className }: TerminalProps) {
  return (
    <Card className={cn("border-primary/20 bg-card/80 backdrop-blur-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-code flex items-center gap-2 text-primary/80">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
