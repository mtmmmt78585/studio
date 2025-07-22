// src/components/VideoPost.tsx
"use client";

import type { Video } from "@/lib/data";
import { Heart, MessageCircle, Send, MoreVertical, Music, User, Flag, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface VideoPostProps {
  video: Video;
}

export function VideoPost({ video }: VideoPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this video by ${video.user.username}`,
          text: video.caption,
          url: window.location.href, // This will share the current page URL
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
            variant: "destructive",
            title: "Could not share",
            description: "There was an error trying to share this video.",
        })
      }
    } else {
        toast({
            title: "Link Copied!",
            description: "Sharing is not supported on this browser, but the link is in your clipboard.",
        })
        navigator.clipboard.writeText(window.location.href);
    }
  };
  
  const handleReport = () => {
    toast({
        title: "Report Submitted",
        description: `Thanks for helping keep Pixgram safe. We'll review this video.`,
    })
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
        
        <Sheet>
            <SheetTrigger asChild>
                <button className="flex flex-col items-center gap-1">
                    <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm">
                        <MessageCircle className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-semibold">{video.comments.toLocaleString()}</span>
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background/90 backdrop-blur-sm h-3/4 flex flex-col">
                 <SheetHeader>
                    <SheetTitle className="text-center font-headline">{video.comments.toLocaleString()} Comments</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <p className="text-center text-muted-foreground">Comments are coming soon!</p>
                </div>
            </SheetContent>
        </Sheet>

         <button className="flex flex-col items-center gap-1" onClick={handleShare}>
            <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm">
                <Send className="h-7 w-7" />
            </div>
            <span className="text-xs font-semibold">{video.shares.toLocaleString()}</span>
        </button>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex flex-col items-center gap-1">
                    <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm">
                        <MoreVertical className="h-7 w-7" />
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background/80 backdrop-blur-sm border-primary/20 text-white">
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                        <User /> View Profile <ArrowRight className="ml-auto" />
                    </Link>
                </DropdownMenuItem>
                <Separator className="bg-primary/20"/>
                 <DropdownMenuItem className="text-red-400 focus:bg-red-500/20 focus:text-red-300" onClick={handleReport}>
                    <Flag /> Report
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
