# **App Name**: Pixgram

## Core Features:

- Reels-Style Home Feed: Vertical reels-style video scroll in the home feed.
- Direct Messaging: DM (chat) system like Instagram, with Firebase Cloud Messaging for real-time messaging.
- Creator Monetization: Monetization system for verified creators (100K followers required). Earnings = 60% of total Ad revenue, monthly payout via UPI/Paytm.
- Mood-Based Algorithm: Mood-based viral video algorithm: Pushes content based on user's detected mood (sad, happy, romantic, angry, etc.). The tool considers watch time, likes, comments, and skip rate. Real-time trend tracking with admin adjustability.
- AI Admin Panel: Professional admin panel with 20-30 active live terminals. Each AI agent handles tasks like bug fixing, mood analysis, creator verification, spam detection, and video ranking. Admin assigns prompts/tasks to each AI Agent.
- Backend System: Firebase Authentication (OTP Login), Firestore DB for users, videos, likes/comments, earnings/views. Firebase Storage for videos, Firebase Functions for payment calculations and notifications.
- Security System: OTP + device fingerprint auth. Blocks rooted/VPN users. IP-based user session limits and role-based access for admin/creators. Secure payouts & transaction logs. AI tool suggests bug fixes.

## Style Guidelines:

- Primary color: Dark red (#8B0000) to match the dark mode with a hacker theme.
- Background color: Near-black background (#080808) for a premium dark mode experience.
- Accent color: Gold (#FFD700) for highlights and important actions, such as approval/freeze buttons.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines and short text, 'Inter' (sans-serif) for longer body text.
- Code font: 'Source Code Pro' for displaying code snippets.
- All icons vector-style (Instagram-inspired but original), ensuring clarity and scalability.
- Story-style smooth animations and Reels-like smooth scrolling feed to enhance user experience.