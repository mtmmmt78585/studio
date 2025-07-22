
"use client";

import { stories, type User } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import Link from "next/link";

interface StoryCarouselProps {
    onStorySelect: (user: User) => void;
}

export function StoryCarousel({ onStorySelect }: StoryCarouselProps) {
  return (
    <div className="px-4 py-2">
      <div className="flex space-x-4 overflow-x-auto no-scrollbar">
        {/* Add Story */}
        <Link href="/upload">
          <div className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-muted-foreground">
                  <AvatarImage src={stories[0].user.avatar} />
                  <AvatarFallback>{stories[0].user.username.slice(0,2)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5 border-2 border-background">
                  <Plus className="h-3 w-3 text-primary-foreground"/>
              </div>
            </div>
            <p className="text-xs text-muted-foreground w-16 truncate text-center">Your Story</p>
          </div>
        </Link>

        {/* Other stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer" onClick={() => onStorySelect(story.user)}>
            <div className={`p-0.5 rounded-full ${story.viewed ? 'bg-muted-foreground' : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'}`}>
                <Avatar className="h-16 w-16 border-2 border-background">
                    <AvatarImage src={story.user.avatar} />
                    <AvatarFallback>{story.user.username.slice(0,2)}</AvatarFallback>
                </Avatar>
            </div>
            <p className="text-xs w-16 truncate text-center">{story.user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
