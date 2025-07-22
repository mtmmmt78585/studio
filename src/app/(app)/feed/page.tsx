
"use client";

import { StoryCarousel } from "@/components/StoryCarousel";
import { StoryViewer } from "@/components/StoryViewer";
import { VideoPost } from "@/components/VideoPost";
import { stories, videos, type User } from "@/lib/data";
import { useState } from "react";

export default function FeedPage() {
  const [storyUser, setStoryUser] = useState<User | null>(null);

  const handleOpenStory = (user: User) => {
    setStoryUser(user);
  };

  const handleCloseStory = () => {
    setStoryUser(null);
  };

  if (storyUser) {
    const userStories = stories.filter(s => s.user.id === storyUser.id);
    return <StoryViewer stories={userStories} onClose={handleCloseStory} />;
  }

  return (
    <div className="h-full bg-black flex flex-col">
      <div className="absolute top-16 left-0 right-0 z-10">
        <StoryCarousel onStorySelect={handleOpenStory} />
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
