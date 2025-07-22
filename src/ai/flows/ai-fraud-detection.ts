'use server';
/**
 * @fileOverview AI-powered fraud detection flow to identify and block fake views for fair monetization.
 *
 * - detectFraud - A function that initiates the fraud detection process.
 * - FraudDetectionInput - The input type for the detectFraud function.
 * - FraudDetectionOutput - The return type for the detectFraud function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudDetectionInputSchema = z.object({
  videoId: z.string().describe('The ID of the video being analyzed.'),
  userId: z.string().describe('The ID of the user watching the video.'),
  watchTime: z.number().describe('The watch time of the video in seconds.'),
  likes: z.number().describe('The number of likes the video has received.'),
  comments: z.number().describe('The number of comments the video has received.'),
  skipRate: z.number().describe('The rate at which viewers skip the video (0-1).'),
  mood: z.enum(['sad', 'happy', 'romantic', 'angry', 'neutral']).describe('The detected mood of the viewer.'),
});
export type FraudDetectionInput = z.infer<typeof FraudDetectionInputSchema>;

const FraudDetectionOutputSchema = z.object({
  isFraudulent: z.boolean().describe('Whether the view is likely fraudulent.'),
  fraudScore: z.number().describe('A score indicating the likelihood of fraud (0-1).'),
  reason: z.string().describe('The reason for the fraud detection.'),
});
export type FraudDetectionOutput = z.infer<typeof FraudDetectionOutputSchema>;

export async function detectFraud(input: FraudDetectionInput): Promise<FraudDetectionOutput> {
  return detectFraudFlow(input);
}

const detectFraudPrompt = ai.definePrompt({
  name: 'detectFraudPrompt',
  input: {schema: FraudDetectionInputSchema},
  output: {schema: FraudDetectionOutputSchema},
  prompt: `You are an AI expert in detecting fraudulent video views on a short video platform.

  Analyze the following data to determine if the view is fraudulent:

  Video ID: {{{videoId}}}
  User ID: {{{userId}}}
  Watch Time: {{{watchTime}}} seconds
  Likes: {{{likes}}}
  Comments: {{{comments}}}
  Skip Rate: {{{skipRate}}}
  Viewer Mood: {{{mood}}}

  Consider these factors:
  - Suspiciously short watch times, especially if combined with low engagement (likes, comments).
  - High skip rates, indicating the viewer is not genuinely interested in the content.
  - Mismatched viewer mood and video content (e.g., angry mood watching a romantic video).
  - Unusually high engagement metrics from a single user.

  Output a JSON object with the following fields:
  - isFraudulent: true if the view is likely fraudulent, false otherwise.
  - fraudScore: A score between 0 and 1 indicating the likelihood of fraud.
  - reason: A brief explanation for the fraud detection.

  Be conservative in flagging views as fraudulent. Only flag views that have strong indicators of fraud.
  `,
});

const detectFraudFlow = ai.defineFlow(
  {
    name: 'detectFraudFlow',
    inputSchema: FraudDetectionInputSchema,
    outputSchema: FraudDetectionOutputSchema,
  },
  async input => {
    const {output} = await detectFraudPrompt(input);
    return output!;
  }
);
