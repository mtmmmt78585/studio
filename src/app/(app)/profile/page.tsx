
"use client";

import { mainUser } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Grid3x3, Bookmark, Heart, UserPlus, Eye, Menu, Camera, Plus, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="h-full flex flex-col">
       {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
            <UserPlus className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-1 font-bold">
            <span>{mainUser.username}</span>
            <ChevronDown className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-4">
          <Eye className="h-6 w-6" />
          <Menu className="h-6 w-6" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 flex flex-col items-center">
            {/* Avatar */}
            <div className="relative mb-2">
                <Avatar className="h-28 w-28 border-2 border-muted">
                    <div className="bg-muted h-full w-full flex items-center justify-center">
                       <Camera className="h-10 w-10 text-muted-foreground"/>
                    </div>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-background">
                    <Plus className="h-4 w-4 text-primary-foreground"/>
                </div>
            </div>
            <p className="font-semibold mb-4">@{mainUser.username}</p>

            {/* Stats */}
            <div className="flex justify-around w-full max-w-sm mb-4">
                <div className="text-center">
                    <p className="font-bold text-lg">{mainUser.following}</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-lg">{(mainUser.followers / 1000).toFixed(1)}k</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-lg">{(mainUser.totalViews / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-muted-foreground">Likes</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mb-4">
                <Button variant="outline" className="flex-1 px-8">Edit profile</Button>
                <Button variant="outline" className="px-4">
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </div>
            <Button variant="link" size="sm" className="text-muted-foreground">+ Add bio</Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent border-t">
                <TabsTrigger value="posts" className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"><Grid3x3 className="h-6 w-6" /></TabsTrigger>
                <TabsTrigger value="saved" className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"><Bookmark className="h-6 w-6" /></TabsTrigger>
                <TabsTrigger value="liked" className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"><Heart className="h-6 w-6" /></TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-0">
                 <div className="grid grid-cols-3 gap-0.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="aspect-video bg-card relative">
                            <Image
                                src={`https://placehold.co/300x500.png?text=Post${i+1}`}
                                alt={`User post ${i}`}
                                fill
                                className="object-cover"
                                data-ai-hint="user content"
                            />
                             <div className="absolute bottom-1 left-1 flex items-center gap-1 bg-black/30 text-white text-xs px-1 rounded">
                                <Heart className="h-3 w-3" />
                                <span>1.2k</span>
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="saved" className="mt-0">
                <div className="text-center text-muted-foreground p-8">
                    <h3 className="font-bold text-lg">Your Saved Videos</h3>
                    <p className="text-sm">These videos are only visible to you.</p>
                </div>
            </TabsContent>
            <TabsContent value="liked" className="mt-0">
                 <div className="text-center text-muted-foreground p-8">
                    <h3 className="font-bold text-lg">Your Liked Videos</h3>
                    <p className="text-sm">Your liked videos will appear here.</p>
                </div>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
