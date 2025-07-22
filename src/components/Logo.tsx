import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-bold font-headline text-primary", className)}>
      <Sparkles className="h-6 w-6" />
      <span>Yappzy</span>
    </div>
  );
}
