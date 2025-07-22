
"use client";

import { VideoPost } from "@/components/VideoPost";
import { type Video, generateVideos } from "@/lib/data";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeedPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate videos on the client side to prevent hydration errors
    const clientVideos = generateVideos(500);
    setVideos(clientVideos);
    setIsLoading(false);
  }, []);

  return (
    <div className="h-full bg-black flex flex-col">
      {isLoading ? (
          <div className="relative flex-1 h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar">
            <div className="h-full w-full snap-start flex-shrink-0 flex items-center justify-center">
                <Skeleton className="w-full h-full bg-card" />
            </div>
          </div>
      ) : (
        <div className="relative flex-1 h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar">
            {videos.map((video) => (
            <div key={video.id} className="h-full w-full snap-start flex-shrink-0">
                <VideoPost video={video} />
            </div>
            ))}
        </div>
      )}
    </div>
  );
}
