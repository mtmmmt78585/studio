// src/components/VideoPost.tsx
"use client";

import type { Video, Comment } from "@/lib/data";
import { Heart, MessageCircle, Send, MoreVertical, Music, User, Flag, ArrowRight, Link as LinkIcon, Share2, PlusCircle, Trash2, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { chats, mainUser } from "@/lib/data";
import { Input } from "@/components/ui/input";

interface VideoPostProps {
  video: Video;
}

export function VideoPost({ video }: VideoPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState<Comment[]>(video.comments);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              // Auto-play was prevented
              if (error.name === "NotAllowedError") {
                console.error("Video autoplay was prevented.", error);
              } else if (error.name === "AbortError") {
                // This is a common error when the user scrolls quickly.
                // It's safe to ignore.
              } else {
                 console.error("Video play failed:", error);
              }
            });
          }
        } else {
          videoElement.pause();
          videoElement.currentTime = 0;
        }
      },
      {
        threshold: 0.5, // Play when at least 50% of the video is visible
      }
    );

    observer.observe(videoElement);

    return () => {
        if (videoElement) {
            observer.unobserve(videoElement);
        }
    };
  }, []);

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
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copy link if share fails for any reason (e.g., permission denied)
        console.error('Error sharing:', error);
        copyLinkToClipboard();
      }
    } else {
      copyLinkToClipboard();
    }
  };
  
  const handleReport = () => {
    toast({
        title: "Report Submitted",
        description: `Thanks for helping keep Yappzy safe. We'll review this video.`,
    })
  }
  
  const handleSaveVideo = () => {
    toast({
        title: "Video Saved",
        description: `You can find this video in your saved items.`
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

  const handlePostComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newComment.trim()) return;
      const comment: Comment = {
          id: `comment_${Date.now()}`,
          user: mainUser,
          text: newComment,
          timestamp: "Just now"
      }
      setComments(prev => [comment, ...prev]);
      setNewComment("");
  }

  const handleDeleteComment = (commentId: string) => {
      setComments(prev => prev.filter(c => c.id !== commentId));
  }

  return (
    <div className="relative h-full w-full bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={video.videoUrl}
        loop
        playsInline
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
                    <span className="text-xs font-semibold">{comments.length.toLocaleString()}</span>
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background/90 backdrop-blur-sm h-3/4 flex flex-col">
                 <SheetHeader>
                    <SheetTitle className="text-center font-headline">{comments.length.toLocaleString()} Comments</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {comments.length > 0 ? comments.map(comment => (
                        <div key={comment.id} className="flex gap-3 items-start group">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.user.avatar}/>
                                <AvatarFallback>{comment.user.username.slice(0,2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">{comment.user.username} · {comment.timestamp}</p>
                                <p className="text-sm">{comment.text}</p>
                            </div>
                            {(comment.user.id === mainUser.id || video.user.id === mainUser.id) && (
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => handleDeleteComment(comment.id)}>
                                    <Trash2 className="h-4 w-4 text-red-500"/>
                                </Button>
                            )}
                        </div>
                    )) : (
                        <p className="text-center text-muted-foreground py-8">No comments yet. Be the first!</p>
                    )}
                </div>
                <div className="p-4 border-t border-border">
                    <form onSubmit={handlePostComment} className="flex gap-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={mainUser.avatar}/>
                            <AvatarFallback>{mainUser.username.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <Input 
                            placeholder="Add a comment..." 
                            className="flex-1 bg-card"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button type="submit" disabled={!newComment.trim()}>Send</Button>
                    </form>
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
            <DropdownMenuContent className="bg-background/80 backdrop-blur-sm border-primary/20 text-white w-48">
                <DropdownMenuItem onClick={handleSaveVideo} className="cursor-pointer">
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Save Video</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-primary/20"/>
                <DropdownMenuItem asChild>
                    <Link href={`/profile?id=${video.user.id}`} className="flex items-center w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" /> 
                        <span>View Profile</span> 
                        <ArrowRight className="ml-auto h-4 w-4" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-primary/20"/>
                 <DropdownMenuItem className="text-red-400 focus:bg-red-500/20 focus:text-red-300 cursor-pointer" onClick={handleReport}>
                    <Flag className="mr-2 h-4 w-4" /> 
                    <span>Report</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
