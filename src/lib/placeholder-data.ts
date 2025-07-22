
// src/lib/placeholder-data.ts

import type { User, Comment, Video, Story, Chat, Effect, Notification, Song } from './data';

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
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
];


const categories: Video['category'][] = ['funny', 'romance', 'love', 'sad', 'cartoon', 'tech'];

const captionTemplates = {
    funny: [
        "This is peak comedy 😂", "I can't stop laughing!", "Wait for the end... 🤣",
        "Funny because it's true.", "My sense of humor is broken."
    ],
    romance: [
        "Couple goals right here. ❤️", "This is what love looks like.", "My heart just melted.",
        "So sweet and romantic.", "Tag your special someone."
    ],
    love: [
        "All you need is love.", "Spreading a little bit of love today.", "Love this moment.",
        "Love wins, always.", "This is pure love."
    ],
    sad: [
        "Right in the feels... 😢", "It's okay to not be okay.", "This is heartbreaking.",
        "Sending virtual hugs.", "Sometimes, you just need a good cry."
    ],
    cartoon: [
        "Childhood memories unlocked!", "The best cartoons ever.", "Animation magic.",
        "Just a little throwback.", "Cartoons are not just for kids."
    ],
    tech: [
        "The future is now! 🤖", "Latest tech unboxing.", "This gadget is a game-changer.",
        "Coding my life away... 💻", "Tech tips you need to know."
    ],
};


export const generateVideos = (count: number): Video[] => {
    const generatedVideos: Video[] = [];
    let lastVideoUrl = '';

    for (let i = 0; i < count; i++) {
        const category = categories[i % categories.length];
        const user = users[i % users.length];
        const caption = captionTemplates[category][Math.floor(Math.random() * captionTemplates[category].length)];
        
        let videoUrl;
        do {
            videoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
        } while (videoUrl === lastVideoUrl && videoUrls.length > 1);
        lastVideoUrl = videoUrl;

        const comments = Math.random() > 0.5 ? sampleComments.slice(0, Math.floor(Math.random() * sampleComments.length + 1)) : [];
        
        generatedVideos.push({
            id: `video_${Date.now()}_${i}`,
            user,
            videoUrl,
            thumbnailUrl: `https://placehold.co/400x700.png?text=Vid${i+1}`,
            caption,
            likes: Math.floor(Math.random() * 250000),
            comments,
            shares: Math.floor(Math.random() * 2500),
            category,
        });
    }
    return generatedVideos;
};

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

// Vast Music Library
const songTitles = [
  "Cosmic Drift", "Neon Pulse", "Future Echo", "Retrograde", "Starlight", "Data Stream", "System Shock", "Grid Runner", "Night Drive",
  "Ocean Bloom", "Forest Lullaby", "Desert Mirage", "Mountain Hymn", "River Flow", "Island Dream", "City Lights", "Subway Groove", "Rooftop Jam",
  "First Kiss", "Last Dance", "Broken Heart", "Summer Fling", "Winter's Tale", "Autumn Leaves", "Spring Awakening", "Midnight Mood", "Sunrise Serenade",
];
const artists = [
  "Vector Seven", "Scandroid", "Mega Drive", "Pylot", "Lazerhawk", "Com Truise", "Mitch Murder", "Waveshaper", "Timecop1983", "The Midnight",
  "Tycho", "Bonobo", "Emancipator", "ODESZA", "Lane 8", "Four Tet", "Caribou", "Boards of Canada", "Aphex Twin", "deadmau5",
];

export const songs: Song[] = Array.from({ length: 2000 }).map((_, i) => {
  const title = songTitles[i % songTitles.length];
  const artist = artists[i % artists.length];
  const durationMinutes = Math.floor(Math.random() * 3) + 2; // 2-4 minutes
  const durationSeconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  
  return {
    id: `song_${i}_${title.toLowerCase().replace(/\s/g, '_')}`,
    title: `${title} #${Math.floor(i / songTitles.length) + 1}`,
    artist: artist,
    coverArtUrl: `https://placehold.co/100x100.png?text=${title.charAt(0)}${title.split(' ')[1] ? title.split(' ')[1].charAt(0) : ''}`,
    duration: `${durationMinutes}:${durationSeconds}`,
  }
});
