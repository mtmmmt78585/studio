
"use client";

import { useState } from "react";
import type { Video } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Music, Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ReelProps {
  video: Video;
}

export function Reel({ video }: ReelProps) {
    const [isLiked, setIsLiked] = useState(false);

    const formatCount = (count: number) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
        return count.toLocaleString();
    };

  return (
    <div className="h-full w-full relative snap-start flex items-center justify-center">
      <video
        src={video.videoUrl}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Video Info Overlay */}
      <div className="absolute bottom-4 left-4 text-white z-10 w-[calc(100%-6rem)]">
        <Link href={`/profile?id=${video.user.id}`} className="flex items-center gap-2 mb-2">
          <Avatar className="h-10 w-10 border-2">
            <AvatarImage src={video.user.avatar} />
            <AvatarFallback>{video.user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <p className="font-bold">{video.user.username}</p>
          <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent border-white text-white">Follow</Button>
        </Link>
        <p className="text-sm mb-2">{video.caption}</p>
        <div className="flex items-center gap-2 text-sm">
            <Music className="h-4 w-4" />
            <p className="truncate">{video.audioName}</p>
        </div>
      </div>
      
      {/* Action Buttons Overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col items-center gap-4 z-10 text-white">
        <button className="flex flex-col items-center gap-1" onClick={() => setIsLiked(p => !p)}>
            <div className="bg-black/20 p-2.5 rounded-full backdrop-blur-sm">
                 <Heart className={cn("h-7 w-7", isLiked && "fill-red-500 text-red-500")} />
            </div>
            <span className="text-xs font-semibold">{formatCount(video.likes + (isLiked ? 1 : 0))}</span>
        </button>
        <button className="flex flex-col items-center gap-1">
            <div className="bg-black/20 p-2.5 rounded-full backdrop-blur-sm">
                <MessageCircle className="h-7 w-7" />
            </div>
            <span className="text-xs font-semibold">{formatCount(video.comments.length)}</span>
        </button>
         <button className="flex flex-col items-center gap-1">
            <div className="bg-black/20 p-2.5 rounded-full backdrop-blur-sm">
                <Bookmark className="h-7 w-7" />
            </div>
            <span className="text-xs font-semibold">Save</span>
        </button>
        <button className="flex flex-col items-center gap-1">
            <div className="bg-black/20 p-2.5 rounded-full backdrop-blur-sm">
                <Share2 className="h-7 w-7" />
            </div>
            <span className="text-xs font-semibold">{formatCount(video.shares)}</span>
        </button>
        <div className="bg-black/50 p-2 rounded-full border-2 border-white/50">
            <Avatar className="h-8 w-8">
                <AvatarImage src={video.user.avatar} />
            </Avatar>
        </div>
      </div>
    </div>
  );
}
