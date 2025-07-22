import { StoryCarousel } from "@/components/StoryCarousel";
import { VideoPost } from "@/components/VideoPost";
import { videos } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="h-full bg-black flex flex-col">
      <div className="absolute top-16 left-0 right-0 z-10">
        <StoryCarousel />
      </div>
      <div className="relative flex-1 h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar">
        {videos.map((video) => (
          <div key={video.id} className="h-full w-full snap-start flex-shrink-0">
            <VideoPost video={video} />
          </div>
        ))}
      </div>
    </div>
  );
}
