import { config } from 'dotenv';
config();

import '@/ai/flows/admin-panel-content-moderation.ts';
import '@/ai/flows/mood-based-content-recommendation.ts';
import '@/ai/flows/ai-content-generation-captions.ts';
import '@/ai/flows/ai-powered-bug-fix-suggestions.ts';
import '@/ai/flows/ai-fraud-detection.ts';