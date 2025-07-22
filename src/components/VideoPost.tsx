// src/components/VideoPost.tsx
"use client";

import type { Video } from "@/lib/data";
import { Heart, MessageCircle, Send, MoreVertical, Music, User, Flag, ArrowRight, Link as LinkIcon, Share2, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { chats } from "@/lib/data";
import { Input } from "@/components/ui/input";

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
  
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "The video link is in your clipboard.",
    });
  }

  const handleShareExternal = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this video by ${video.user.username}`,
          text: video.caption,
          url: window.location.href, // This will share the current page URL
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // User might have cancelled the share action, so we don't show an error.
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      copyLinkToClipboard();
    }
  };
  
  const handleReport = () => {
    toast({
        title: "Report Submitted",
        description: `Thanks for helping keep Pixgram safe. We'll review this video.`,
    })
  }

  const handleSendToFriend = (username: string) => {
    toast({
        title: "Sent!",
        description: `You sent ${video.user.username}'s video to ${username}.`
    })
  }
  
  const handleAddToStory = () => {
      toast({
        title: "Added to your story!",
        description: "For the next 24 hours, your followers can see this video in your story."
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

        <Sheet>
            <SheetTrigger asChild>
                <button className="flex flex-col items-center gap-1">
                    <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm">
                        <Send className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-semibold">{video.shares.toLocaleString()}</span>
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background/90 backdrop-blur-sm h-[60%] flex flex-col">
                <SheetHeader>
                    <SheetTitle className="text-center font-headline">Share Video</SheetTitle>
                </SheetHeader>
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-center">
                         <button className="flex flex-col items-center gap-2" onClick={handleShareExternal}>
                            <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center"><Share2 /></div>
                            <span className="text-xs">Share to...</span>
                        </button>
                         <button className="flex flex-col items-center gap-2" onClick={copyLinkToClipboard}>
                            <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center"><LinkIcon /></div>
                            <span className="text-xs">Copy Link</span>
                        </button>
                        <button className="flex flex-col items-center gap-2" onClick={handleAddToStory}>
                            <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center"><PlusCircle /></div>
                            <span className="text-xs">Add to Story</span>
                        </button>
                    </div>
                    <Separator />
                    <Input placeholder="Search friends..." className="bg-card" />
                    <div className="space-y-2 h-[20vh] overflow-y-auto">
                        {chats.map(chat => (
                            <div key={chat.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-card">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={chat.user.avatar} />
                                    <AvatarFallback>{chat.user.username.slice(0,2)}</AvatarFallback>
                                </Avatar>
                                <p className="flex-1 font-semibold">{chat.user.username}</p>
                                <Button size="sm" variant="outline" onClick={() => handleSendToFriend(chat.user.username)}>Send</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>


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
                    <Link href={`/profile?id=${video.user.id}`} className="flex items-center gap-2 cursor-pointer">
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
