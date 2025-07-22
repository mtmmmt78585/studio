
"use client";

import { LongVideoPost } from "@/components/LongVideoPost";
import { type Video, generateVideos } from "@/lib/data";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function FeedPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const clientVideos = generateVideos(20);
    setVideos(clientVideos);
    setIsLoading(false);
  }, []);

  const longVideos = videos.filter(v => v.duration > 60);

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/feed" className="text-primary border-b-2 border-primary pb-1">For You</Link>
          <Link href="/feed" className="text-muted-foreground">Following</Link>
        </div>
        <Search className="h-6 w-6 text-muted-foreground" />
      </header>
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
    </div>
  );
}
