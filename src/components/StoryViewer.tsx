
"use client";

import { useState, useEffect, useRef } from 'react';
import type { Story } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface StoryViewerProps {
  stories: Story[];
  onClose: () => void;
}

export function StoryViewer({ stories, onClose }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const story = stories[currentStoryIndex];
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const goToNextStory = () => {
    setCurrentStoryIndex((prev) => {
        if (prev < stories.length - 1) {
            return prev + 1;
        }
        onClose(); // Close if it's the last story
        return prev;
    });
  };

  const goToPrevStory = () => {
    setCurrentStoryIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    setProgress(0);
    setIsLiked(false);
    setReplyText("");
  }, [currentStoryIndex]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const storyDuration = 5000; // 5 seconds
    const interval = 50; // update every 50ms
    const steps = storyDuration / interval;
    const progressIncrement = 100 / steps;

    timerRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          goToNextStory();
          return 100;
        }
        return p + progressIncrement;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentStoryIndex, stories.length, onClose, isPaused]);


  const handleInteractionStart = () => {
      setIsPaused(true);
  };
  
  const handleInteractionEnd = () => {
    setIsPaused(false);
  };
  
  const handleSendReply = () => {
      if (!replyText.trim()) return;
      toast({
          title: "Reply Sent!",
          description: `You replied to ${story.user.username}'s story.`
      });
      setReplyText("");
  }
  
  const handleShare = () => {
      toast({
          title: "Coming Soon!",
          description: "Sharing stories will be available in a future update."
      })
  }

  if (!story) {
      onClose();
      return null;
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-md max-h-[95vh] rounded-lg overflow-hidden bg-card" >
        
        {/* Story Image */}
        <Image
            src={story.imageUrl}
            alt={`Story from ${story.user.username}`}
            fill
            className="object-cover"
            priority
            data-ai-hint="social media story"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4"
             onMouseDown={handleInteractionStart} 
             onMouseUp={handleInteractionEnd} 
             onTouchStart={handleInteractionStart} 
             onTouchEnd={handleInteractionEnd} >
          <div className="flex items-center gap-2 mb-2">
            {stories.map((s, index) => (
              <div key={s.id} className="flex-1 h-1 bg-white/30 rounded-full">
                <div 
                    className="h-1 bg-primary rounded-full transition-all duration-50 ease-linear"
                    style={{ width: `${index < currentStoryIndex ? 100 : (index === currentStoryIndex ? progress : 0)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={story.user.avatar} />
                <AvatarFallback>{story.user.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <p className="font-bold text-white">{story.user.username}</p>
            </div>
            <button onClick={onClose} className="text-white bg-black/30 rounded-full p-1">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute inset-y-0 left-0 w-1/3" onClick={goToPrevStory} />
        <div className="absolute inset-y-0 right-0 w-1/3" onClick={goToNextStory} />
        
        {/* Footer actions */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
            <Input 
                placeholder={`Reply to ${story.user.username}...`}
                className="bg-black/40 border-white/30 text-white placeholder:text-white/70 flex-1"
                onFocus={handleInteractionStart}
                onBlur={handleInteractionEnd}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
            />
             <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsLiked(p => !p)}>
                <Heart className={cn("h-7 w-7", isLiked && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white" onClick={handleShare}>
                <Send className="h-7 w-7" />
            </Button>
        </div>
      </div>
    </div>
  );
}
