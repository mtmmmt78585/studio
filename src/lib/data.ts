
export type User = {
  id: string;
  username: string;
  avatar: string;
  followers: number;
  following: number;
  totalViews: number;
  isVerified: boolean;
};

export type Video = {
  id: string;
  user: User;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  likes: number;
  comments: number;
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

export const mainUser: User = {
    id: 'user_main',
    username: 'CodeNinja',
    avatar: 'https://placehold.co/100x100/FFD700/000000.png?text=CN',
    followers: 125000,
    following: 150,
    totalViews: 15_700_000,
    isVerified: true,
};

export const users: User[] = [
  mainUser,
  { id: 'user1', username: 'TechGoddess', avatar: 'https://placehold.co/100x100/A855F7/FFFFFF.png?text=TG', followers: 50200, following: 200, totalViews: 5_200_000, isVerified: true },
  { id: 'user2', username: 'DanceMachine', avatar: 'https://placehold.co/100x100/EC4899/FFFFFF.png?text=DM', followers: 1.2 * 1000000, following: 1200, totalViews: 120_000_000, isVerified: false },
  { id: 'user3', username: 'FunnyDude', avatar: 'https://placehold.co/100x100/F97316/FFFFFF.png?text=FD', followers: 89000, following: 50, totalViews: 9_800_000, isVerified: false },
  { id: 'user4', username: 'ArtisticSoul', avatar: 'https://placehold.co/100x100/22C55E/FFFFFF.png?text=AS', followers: 250000, following: 1, totalViews: 28_000_000, isVerified: true },
  { id: 'user5', username: 'TravelJunkie', avatar: 'https://placehold.co/100x100/3B82F6/FFFFFF.png?text=TJ', followers: 450000, following: 300, totalViews: 45_000_000, isVerified: true },
  { id: 'user6', username: 'FoodLover', avatar: 'https://placehold.co/100x100/EF4444/FFFFFF.png?text=FL', followers: 75000, following: 500, totalViews: 8_000_000, isVerified: false },
];


export const stories: Story[] = users.map((user, i) => ({
  id: `story${i}`,
  user,
  imageUrl: `https://placehold.co/300x500.png?text=Story${i+1}`,
  viewed: i > 2,
}));

export const videos: Video[] = [
  {
    id: 'video1',
    user: users[1],
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    thumbnailUrl: 'https://placehold.co/400x700.png',
    caption: 'Chill vibes and coding sprints! 🔥 #developer #coding',
    likes: 12300,
    comments: 456,
    shares: 123,
    category: 'tech'
  },
  {
    id: 'video2',
    user: users[2],
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://placehold.co/400x700.png',
    caption: 'New dance challenge! Can you do it? 💃 #dance #challenge',
    likes: 45600,
    comments: 1234,
    shares: 567,
    category: 'funny'
  },
  {
    id: 'video3',
    user: users[3],
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://placehold.co/400x700.png',
    caption: 'You won\'t believe what happened next... 😂 #comedy #funny',
    likes: 78900,
    comments: 2345,
    shares: 890,
    category: 'funny'
  },
  {
    id: 'video4',
    user: users[4],
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailUrl: 'https://placehold.co/400x700.png',
    caption: 'A tale of a lonely dragon. #sad #animation',
    likes: 98700,
    comments: 3456,
    shares: 987,
    category: 'sad'
  },
  {
    id: 'video5',
    user: users[5],
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: 'https://placehold.co/400x700.png',
    caption: 'Future of tech is here! #vfx #scifi',
    likes: 150000,
    comments: 5678,
    shares: 1500,
    category: 'tech'
  },
  {
    id: 'video6',
    user: users[0],
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: 'https://placehold.co/400x700.png',
    caption: 'This is so sweet! ❤️ #love #romance',
    likes: 250000,
    comments: 8910,
    shares: 2500,
    category: 'love'
  },
  {
    id: 'video7',
    user: users[3],
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    thumbnailUrl: 'https://placehold.co/400x700.png',
    caption: 'My new ride! #comedy #cars',
    likes: 50000,
    comments: 1000,
    shares: 400,
    category: 'funny'
  }
];

export const chats: Chat[] = [
    {
        id: 'chat1',
        user: users[1],
        messages: [
            { id: 'm1', text: 'Hey, love your latest video!', sender: 'them', timestamp: '10:30 AM' },
            { id: 'm2', text: 'Thanks so much! Glad you liked it.', sender: 'me', timestamp: '10:31 AM' },
        ],
        lastMessage: 'Thanks so much! Glad you liked it.',
        lastMessageTime: '10:31 AM',
        unreadCount: 0,
    },
    {
        id: 'chat2',
        user: users[3],
        messages: [
            { id: 'm3', text: 'Got a collab idea for you!', sender: 'them', timestamp: 'Yesterday' },
        ],
        lastMessage: 'Got a collab idea for you!',
        lastMessageTime: 'Yesterday',
        unreadCount: 2,
    },
     {
        id: 'chat3',
        user: users[4],
        messages: [
            { id: 'm4', text: 'That art piece was amazing', sender: 'them', timestamp: '2 days ago' },
        ],
        lastMessage: 'That art piece was amazing',
        lastMessageTime: '2d',
        unreadCount: 0,
    },
];

export const effects: Effect[] = [
    { id: 'cyber', name: 'Cyberpunk', thumbnailUrl: 'https://placehold.co/100x100/7C3AED/FFFFFF.png?text=Cyber', isPremium: true },
    { id: 'glitch', name: 'Glitch', thumbnailUrl: 'https://placehold.co/100x100/EC4899/FFFFFF.png?text=Glitch', isPremium: false },
    { id: 'retro', name: 'Retro', thumbnailUrl: 'https://placehold.co/100x100/F97316/FFFFFF.png?text=Retro', isPremium: false },
    { id: 'neon', name: 'Neon', thumbnailUrl: 'https://placehold.co/100x100/22C55E/FFFFFF.png?text=Neon', isPremium: true },
    { id: 'vintage', name: 'Vintage', thumbnailUrl: 'https://placehold.co/100x100/8B5CF6/FFFFFF.png?text=Vintage', isPremium: false },
    { id: 'lomo', name: 'Lomo', thumbnailUrl: 'https://placehold.co/100x100/3B82F6/FFFFFF.png?text=Lomo', isPremium: true },
    { id: 'dreamy', name: 'Dreamy', thumbnailUrl: 'https://placehold.co/100x100/F472B6/FFFFFF.png?text=Dreamy', isPremium: true },
    { id: 'noir', name: 'Noir', thumbnailUrl: 'https://placehold.co/100x100/6B7280/FFFFFF.png?text=Noir', isPremium: false },
]

    