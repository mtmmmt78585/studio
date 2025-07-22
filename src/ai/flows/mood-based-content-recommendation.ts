'use server';
/**
 * @fileOverview Recommends videos based on user's viewing behavior and detected mood.
 *
 * - recommendVideos - A function that handles the video recommendation process.
 * - MoodBasedContentRecommendationInput - The input type for the recommendVideos function.
 * - MoodBasedContentRecommendationOutput - The return type for the recommendVideos function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodBasedContentRecommendationInputSchema = z.object({
  userViewingHistory: z.string().describe('The viewing history of the user.'),
  detectedMood: z.enum(['sad', 'happy', 'romantic', 'angry', 'neutral']).describe('The detected mood of the user.'),
  videoCategories: z.string().describe('Available video categories'),
});
export type MoodBasedContentRecommendationInput = z.infer<typeof MoodBasedContentRecommendationInputSchema>;

const MoodBasedContentRecommendationOutputSchema = z.object({
  recommendedVideos: z.array(z.string()).describe('An array of recommended video titles.'),
  reasoning: z.string().describe('The reasoning behind the video recommendations.'),
});
export type MoodBasedContentRecommendationOutput = z.infer<typeof MoodBasedContentRecommendationOutputSchema>;

export async function recommendVideos(input: MoodBasedContentRecommendationInput): Promise<MoodBasedContentRecommendationOutput> {
  return moodBasedContentRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moodBasedContentRecommendationPrompt',
  input: {schema: MoodBasedContentRecommendationInputSchema},
  output: {schema: MoodBasedContentRecommendationOutputSchema},
  prompt: `You are an AI video recommendation expert. Based on the user's viewing history, detected mood, and available video categories, you will recommend a list of videos.

User Viewing History: {{{userViewingHistory}}}
Detected Mood: {{{detectedMood}}}
Available Video Categories: {{{videoCategories}}}

Please provide a list of recommended video titles, and your reasoning behind the recommendations.
`,
});

const moodBasedContentRecommendationFlow = ai.defineFlow(
  {
    name: 'moodBasedContentRecommendationFlow',
    inputSchema: MoodBasedContentRecommendationInputSchema,
    outputSchema: MoodBasedContentRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
