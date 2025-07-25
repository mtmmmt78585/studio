
"use client";

import { LongVideoPost } from "@/components/LongVideoPost";
import { type Video, generateVideos, stories, type User } from "@/lib/data";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { Bell, Search, Send } from "lucide-react";
import { StoryCarousel } from "@/components/StoryCarousel";
import dynamic from "next/dynamic";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

const StoryViewer = dynamic(() => import('@/components/StoryViewer').then(mod => mod.StoryViewer));


export default function FeedPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStoryUser, setSelectedStoryUser] = useState<User | null>(null);

  useEffect(() => {
    const clientVideos = generateVideos(20);
    setVideos(clientVideos);
    setIsLoading(false);
  }, []);

  const longVideos = videos.filter(v => v.duration > 60);

  const handleStorySelect = (user: User) => {
    setSelectedStoryUser(user);
  };

  const handleCloseViewer = () => {
    setSelectedStoryUser(null);
  };

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between p-4 border-b">
         <Logo className="text-2xl" />
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/search"><Search className="h-6 w-6" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/notifications"><Bell className="h-6 w-6" /></Link>
            </Button>
             <Button variant="ghost" size="icon" asChild>
                <Link href="/dm"><Send className="h-6 w-6" /></Link>
            </Button>
        </div>
      </header>
       <StoryCarousel onStorySelect={handleStorySelect} />
       <Tabs defaultValue="for-you" className="w-full flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-transparent px-4">
            <TabsTrigger value="for-you">For You</TabsTrigger>
             <TabsTrigger value="shorts" asChild>
                <Link href="/shorts">Shorts</Link>
            </TabsTrigger>
        </TabsList>
        <TabsContent value="for-you" className="flex-1 overflow-y-auto mt-0">
             {isLoading ? (
                <div className="space-y-4 p-4">
                    <Skeleton className="w-full h-52" />
                    <Skeleton className="w-full h-52" />
                    <Skeleton className="w-full h-52" />
                </div>
                ) : (
                <div className="flex flex-col">
                    {longVideos.map((video) => (
                        <LongVideoPost key={video.id} video={video} />
                    ))}
                </div>
            )}
        </TabsContent>
       </Tabs>
        {selectedStoryUser && (
            <StoryViewer stories={stories.filter(s => s.user.id === selectedStoryUser.id)} onClose={handleCloseViewer} />
        )}
    </div>
  );
}
