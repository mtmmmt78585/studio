import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ExplorePage() {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search creators, videos..." className="pl-8" />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 21 }).map((_, i) => (
            <div key={i} className="aspect-square bg-card relative">
                <Image
                    src={`https://placehold.co/300x300.png?text=Post${i+1}`}
                    alt={`Explore post ${i}`}
                    fill
                    className="object-cover"
                    data-ai-hint="social media content"
                />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
