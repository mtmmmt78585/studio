
"use client";

import { useState, useEffect } from "react";
import { generateVideos, type Video } from "@/lib/data";
import { Reel } from "@/components/Reel";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ShortsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const allVideos = generateVideos(30);
    setVideos(allVideos.filter(v => v.duration <= 60));
    setIsLoading(false);
  }, []);

  return (
    <div className="h-full w-full relative bg-black snap-y snap-mandatory overflow-y-scroll">
      <div className="absolute top-4 left-4 z-20">
        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 text-white" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
      </div>
      {isLoading ? (
         <Skeleton className="h-full w-full" />
      ) : (
        videos.map((video) => <Reel key={video.id} video={video} />)
      )}
    </div>
  );
}
