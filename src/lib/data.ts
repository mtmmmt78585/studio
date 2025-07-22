// src/lib/data.ts
import { mainUser, users, stories, chats, effects, notifications, generateVideos } from './placeholder-data';

export type User = {
  id: string;
  username: string;
  avatar: string;
  followers: number;
  following: number;
  totalViews: number;
  isVerified: boolean;
};

export type Comment = {
  id: string;
  user: User;
  text: string;
  timestamp: string;
};

export type Video = {
  id: string;
  user: User;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  shares: number;
  category: 'funny' | 'romance' | 'love' | 'sad' | 'cartoon' | 'tech';
};

export type Story = {
  id: string;
  user: User;
  imageUrl: string;
  viewed: boolean;
};

export type Chat = {
    id: string;
    user: User;
    messages: { id: string; text: string; sender: 'me' | 'them'; timestamp: string }[];
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

export type Effect = {
    id: string;
    name: string;
    thumbnailUrl: string;
    isPremium: boolean;
};

export type Notification = {
    id: string;
    user: User;
    type: 'like' | 'comment' | 'follow' | 'mention';
    timestamp: string;
    postImageUrl?: string;
    read: boolean;
}

// Re-exporting the data so other files don't need to change their imports.
export { mainUser, users, stories, chats, effects, notifications, generateVideos };
