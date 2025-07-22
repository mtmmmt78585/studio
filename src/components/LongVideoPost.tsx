
"use client";

import type { Video } from "@/lib/data";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";

interface LongVideoPostProps {
  video: Video;
}

export const LongVideoPost = React.memo(function LongVideoPost({ video }: LongVideoPostProps) {

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toLocaleString();
  };
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  }

  return (
    <div className="w-full">
      <div className="relative aspect-video bg-card">
        <Link href="#">
          <Image
            src={video.thumbnailUrl}
            alt={video.caption}
            fill
            className="object-cover"
            data-ai-hint="video content"
            priority
          />
        </Link>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
            {formatDuration(video.duration)}
        </div>
      </div>
      <div className="p-4 flex gap-4">
        <Link href={`/profile?id=${video.user.id}`}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={video.user.avatar} />
            <AvatarFallback>{video.user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <h3 className="font-semibold text-base leading-tight">{video.caption}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {video.user.username} · {formatCount(video.viewCount)} views · {video.uploadTimestamp}
          </p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button><MoreVertical className="h-5 w-5 text-muted-foreground" /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Save to playlist</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
});
