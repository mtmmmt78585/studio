// src/components/VideoPost.tsx
"use client";

import type { Video } from "@/lib/data";
import { Heart, MessageCircle, Send, MoreVertical, Music } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VideoPostProps {
  video: Video;
}

export function VideoPost({ video }: VideoPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  }

  return (
    <div className="relative h-full w-full bg-black">
      <video
        className="h-full w-full object-cover"
        src={video.videoUrl}
        loop
        autoPlay
        playsInline
        muted // Muted by default to allow autoplay in most browsers
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      {/* Footer Info */}
      <div className="absolute bottom-16 left-4 right-16 text-white">
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={video.user.avatar} />
                <AvatarFallback>{video.user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="font-bold text-sm">{video.user.username}</p>
            <Button size="sm" className={cn("h-6 px-3 text-xs", isFollowing ? 'bg-secondary text-secondary-foreground' : 'bg-primary')} onClick={handleFollow}>
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
        </div>
        <p className="mt-2 text-sm">{video.caption}</p>
        <div className="flex items-center gap-2 mt-2">
            <Music className="h-4 w-4"/>
            <p className="text-xs font-semibold animate-pulse">Original Audio - {video.user.username}</p>
        </div>
      </div>

      {/* Side Actions */}
      <div className="absolute bottom-16 right-2 flex flex-col items-center gap-4 text-white">
        <button className="flex flex-col items-center gap-1" onClick={handleLike}>
            <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm">
                <Heart className={cn("h-7 w-7", isLiked && "fill-primary text-primary")} />
            </div>
            <span className="text-xs font-semibold">{isLiked ? (video.likes + 1).toLocaleString() : video.likes.toLocaleString()}</span>
        </button>
         <button className="flex flex-col items-center gap-1">
            <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm">
                <MessageCircle className="h-7 w-7" />
            </div>
            <span className="text-xs font-semibold">{video.comments.toLocaleString()}</span>
        </button>
         <button className="flex flex-col items-center gap-1">
            <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm">
                <Send className="h-7 w-7" />
            </div>
            <span className="text-xs font-semibold">{video.shares.toLocaleString()}</span>
        </button>
         <button className="flex flex-col items-center gap-1">
            <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm">
                <MoreVertical className="h-7 w-7" />
            </div>
        </button>
      </div>
    </div>
  );
}
