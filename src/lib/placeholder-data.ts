// src/lib/placeholder-data.ts

import type { User, Comment, Video, Story, Chat, Effect, Notification } from './data';

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
  id: `story${i}_${user.id}`,
  user,
  imageUrl: `https://placehold.co/300x500.png?text=Story${i+1}`,
  viewed: i > 2,
}));

const sampleComments: Comment[] = [
    { id: 'comment1', user: users[2], text: 'This is hilarious! 😂', timestamp: '2h ago' },
    { id: 'comment2', user: users[4], text: 'Wow, such amazing talent!', timestamp: '1h ago' },
    { id: 'comment3', user: mainUser, text: 'Great content, keep it up!', timestamp: '30m ago' },
    { id: 'comment4', user: users[5], text: 'I wish I was there!', timestamp: '15m ago' },
];

const videoUrls = [
    'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
];

const categories: Video['category'][] = ['funny', 'romance', 'love', 'sad', 'cartoon', 'tech'];
const captions = [
    'This is amazing!', 'Check this out!', 'New challenge alert!', 'Coding vibes only 💻',
    'Just for fun 😂', 'Wait for it...', 'Can you relate?', 'My daily routine.', 'Must watch!',
    'Epic fail or win? 🤔', 'Travel goals!', 'Foodie life.', 'Art in motion.', 'Unboxing happiness.'
];

const generateVideos = (count: number): Video[] => {
    const generatedVideos: Video[] = [];
    for (let i = 0; i < count; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const comments = Math.random() > 0.5 ? sampleComments.slice(0, Math.floor(Math.random() * sampleComments.length + 1)) : [];
        generatedVideos.push({
            id: `video_${Date.now()}_${i}`,
            user,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
            thumbnailUrl: `https://placehold.co/400x700.png?text=Vid${i+1}`,
            caption: captions[Math.floor(Math.random() * captions.length)],
            likes: Math.floor(Math.random() * 250000),
            comments,
            shares: Math.floor(Math.random() * 2500),
            category: categories[Math.floor(Math.random() * categories.length)],
        });
    }
    return generatedVideos;
};

export const videos: Video[] = generateVideos(50);


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

const effectNames = [
    "Cyberpunk", "Glitch", "Retro", "Neon", "Vintage", "Lomo", "Dreamy", "Noir",
    "Stardust", "Cosmic", "Galaxy", "Nebula", "Aurora", "Solaris", "Lunar", "Chromatic",
    "Kaleido", "Prism", "Hologram", "Infrared", "X-Ray", "Pixelate", "ASCII", "Scanlines",
    "VHS", "8mm", "Cinematic", "Technicolor", "Sepia", "Monochrome", "Invert", "Solarize",
    "Pop Art", "Comic Book", "Watercolor", "Oil Painting", "Sketch", "Charcoal", "Blueprint", "Engrave",
    "Glow", "Bloom", "Shine", "Sparkle", "Lens Flare", "Light Leak", "Bokeh", "Vignette",
    "Duotone", "Tritone", "Gradient", "Colorama", "Thermal", "Psychedelic", "Trippy", "Warp",
    "Fisheye", "Mirror", "Fractal", "Mosaic", "Tiles", "Crosshatch", "Halftone", "Dot Matrix",
    "Glitter", "Confetti", "Bubbles", "Rain", "Snow", "Fire", "Smoke", "Fog",
    "Anaglyph", "3D", "Stereo", "Glitchwave", "Vaporwave", "Synthwave", "Retrowave", "Outrun",
    "Ghosting", "Motion Blur", "Zoom Blur", "Radial Blur", "Soft Focus", "Sharpen", "Clarity", "HDR",
    "Golden Hour", "Twilight", "Midnight", "Daydream", "Fantasy", "Mystic", "Enchanted", "Surreal"
];

const allEffects: string[] = [];
// Create a large list of effect names by repeating the base list
for (let i = 0; i < 10; i++) {
    allEffects.push(...effectNames);
}


export const effects: Effect[] = allEffects.slice(0, 1000).map((name, index) => ({
    id: `${name.toLowerCase().replace(/\s/g, '_')}_${index}`,
    name: name,
    thumbnailUrl: `https://placehold.co/100x100.png?text=${name.charAt(0)}`,
    isPremium: Math.random() > 0.5,
}));

export const notifications: Notification[] = [
    {
        id: 'notif1',
        user: users[1],
        type: 'like',
        timestamp: '2m ago',
        postImageUrl: 'https://placehold.co/50x50.png?text=Post',
        read: false,
    },
    {
        id: 'notif2',
        user: users[2],
        type: 'comment',
        timestamp: '1h ago',
        postImageUrl: 'https://placehold.co/50x50.png?text=Post',
        read: false,
    },
    {
        id: 'notif3',
        user: users[3],
        type: 'follow',
        timestamp: '3h ago',
        read: true,
    },
    {
        id: 'notif4',
        user: users[4],
        type: 'like',
        timestamp: '1d ago',
        postImageUrl: 'https://placehold.co/50x50.png?text=Post',
        read: true,
    },
    {
        id: 'notif5',
        user: users[5],
        type: 'mention',
        timestamp: '2d ago',
        postImageUrl: 'https://placehold.co/50x50.png?text=Post',
        read: true,
    },
];
