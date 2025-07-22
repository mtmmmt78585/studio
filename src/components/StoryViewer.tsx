
"use client";

import { useState, useEffect, useRef } from 'react';
import type { Story } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
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

  const goToNextStory = () => {
    setCurrentStoryIndex((prev) => (prev < stories.length - 1 ? prev + 1 : prev));
  };

  const goToPrevStory = () => {
    setCurrentStoryIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    setProgress(0);
    setIsLiked(false);
    setReplyText("");
    const storyDuration = 5000; // 5 seconds per story

    const startTime = Date.now();
    
    timerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / storyDuration) * 100;
      
      if (newProgress >= 100) {
        if (currentStoryIndex < stories.length - 1) {
          goToNextStory();
        } else {
          onClose();
        }
      } else {
        setProgress(newProgress);
      }
    }, 50);

    return () => {
      if(timerRef.current) {
        clearInterval(timerRef.current)
      }
    };
  }, [currentStoryIndex, stories.length, onClose]);


  const handleInteractionStart = () => {
      if(timerRef.current) {
        clearInterval(timerRef.current)
      }
  };
  
  const handleInteractionEnd = () => {
    // This is a simplified resume. A more robust implementation would recalculate progress.
    const storyDuration = 5000;
    const remainingTime = storyDuration * (1 - progress / 100);

    timerRef.current = setTimeout(() => {
         if (currentStoryIndex < stories.length - 1) {
          goToNextStory();
        } else {
          onClose();
        }
    }, remainingTime);
  };
  
  const handleSendReply = () => {
      if (!replyText.trim()) return;
      toast({
          title: "Reply Sent!",
          description: `You replied to ${story.user.username}'s story.`
      });
      setReplyText("");
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-md max-h-[95vh] rounded-lg overflow-hidden bg-card" 
           onMouseDown={handleInteractionStart} 
           onMouseUp={handleInteractionEnd} 
           onTouchStart={handleInteractionStart} 
           onTouchEnd={handleInteractionEnd}>
        
        {/* Story Image */}
        <Image
            src={story.imageUrl}
            alt={`Story from ${story.user.username}`}
            fill
            className="object-cover"
            priority
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-2">
            {stories.map((s, index) => (
              <div key={s.id} className="flex-1 h-1 bg-white/30 rounded-full">
                <div 
                    className="h-1 bg-primary rounded-full"
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
            <Button variant="ghost" size="icon" className="text-white" onClick={handleSendReply}>
                <Send className="h-7 w-7" />
            </Button>
        </div>
      </div>
    </div>
  );
}
