import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, text = "Yappzy" }: { className?: string, text?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-bold font-headline text-primary", className)}>
      <Sparkles className="h-6 w-6" />
      <span>{text}</span>
    </div>
  );
}
