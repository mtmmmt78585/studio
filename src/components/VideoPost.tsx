
// src/components/VideoPost.tsx
"use client";

import type { Video, Comment } from "@/lib/data";
import { Heart, MessageCircle, Send, MoreVertical, Music, User, Flag, ArrowRight, Link as LinkIcon, Share2, PlusCircle, Trash2, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mainUser } from "@/lib/data";
import { Input } from "@/components/ui/input";

interface VideoPostProps {
  video: Video;
}

export function VideoPost({ video }: VideoPostProps) {
  const [isSaved, setIsSaved] =useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState<Comment[]>(video.comments);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.muted = true; // Ensure video is muted for autoplay
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              if (error.name === "NotAllowedError") {
                console.error("Video autoplay was prevented.", error);
              } else if (error.name === "AbortError") {
                // Safe to ignore.
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
        threshold: 0.5,
      }
    );

    observer.observe(videoElement);

    return () => {
        if (videoElement) {
            observer.unobserve(videoElement);
        }
    };
  }, []);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
     toast({
        title: isFollowing ? `Unfollowed ${video.user.username}` : `Followed ${video.user.username}!`,
      });
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
    setIsSaved(!isSaved);
    toast({
        title: isSaved ? "Video Unsaved" : "Video Saved",
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

  const handleLike = () => {
      setIsLiked(!isLiked);
  }

  const formatCount = (count: number) => {
      if (count >= 1000) {
          return `${(count / 1000).toFixed(1)}k`;
      }
      return count.toLocaleString();
  }
  
  const likeCount = video.likes + (isLiked ? 1 : 0);

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
            <Link href={`/profile?id=${video.user.id}`}>
                <p className="font-bold text-sm">@{video.user.username}</p>
            </Link>
        </div>
        <p className="mt-2 text-sm">{video.caption}</p>
        <div className="flex items-center gap-2 mt-2">
            <Music className="h-4 w-4"/>
            <p className="text-xs font-semibold">{video.audioName}</p>
        </div>
      </div>

      {/* Side Actions */}
      <div className="absolute bottom-16 right-2 flex flex-col items-center gap-4 text-white">
        <Link href={`/profile?id=${video.user.id}`} className="relative">
            <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src={video.user.avatar} />
                <AvatarFallback>{video.user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            {!isFollowing && (
                 <button onClick={handleFollow} className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <PlusCircle className="h-5 w-5 text-primary-foreground" strokeWidth={3}/>
                 </button>
            )}
        </Link>
        
        <button className="flex flex-col items-center gap-1" onClick={handleLike}>
            <div className="bg-black/20 p-2.5 rounded-full backdrop-blur-sm">
                <Heart className={cn("h-7 w-7 transition-colors", isLiked && "fill-primary text-primary")} />
            </div>
            <span className="text-xs font-semibold">{formatCount(likeCount)}</span>
        </button>

        <button className="flex flex-col items-center gap-1" onClick={handleSaveVideo}>
            <div className="bg-black/20 p-2.5 rounded-full backdrop-blur-sm">
                <Bookmark className={cn("h-7 w-7 transition-colors", isSaved && "fill-yellow-400 text-yellow-400")} />
            </div>
            <span className="text-xs font-semibold">Save</span>
        </button>
        
        <Sheet>
            <SheetTrigger asChild>
                <button className="flex flex-col items-center gap-1">
                    <div className="bg-black/20 p-2.5 rounded-full backdrop-blur-sm">
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
                        <Button type="submit" variant="secondary" disabled={!newComment.trim()}>Send</Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
        
        <button className="flex flex-col items-center gap-1" onClick={handleShareExternal}>
            <div className="bg-black/20 p-2.5 rounded-full backdrop-blur-sm">
                <Share2 className="h-7 w-7" />
            </div>
            <span className="text-xs font-semibold">{video.shares.toLocaleString()}</span>
        </button>

      </div>
    </div>
  );
}
