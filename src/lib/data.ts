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
  { id: 'user1', username: 'TechGoddess', avatar: 'https://placehold.co/100x100.png', followers: 50200, following: 200, totalViews: 5_200_000, isVerified: true },
  { id: 'user2', username: 'DanceMachine', avatar: 'https://placehold.co/100x100.png', followers: 1.2, following: 1200, totalViews: 120_000_000, isVerified: false },
  { id: 'user3', username: 'FunnyDude', avatar: 'https://placehold.co/100x100.png', followers: 89000, following: 50, totalViews: 9_800_000, isVerified: false },
  { id: 'user4', username: 'ArtisticSoul', avatar: 'https://placehold.co/100x100.png', followers: 250000, following: 1, totalViews: 28_000_000, isVerified: true },
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
  },
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
