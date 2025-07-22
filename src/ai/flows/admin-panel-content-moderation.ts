'use server';
/**
 * @fileOverview AI-powered content moderation flow for the admin panel.
 *
 * - moderateContent - A function to moderate content based on community guidelines and sentiment analysis.
 * - ModerateContentInput - The input type for the moderateContent function.
 * - ModerateContentOutput - The return type for the moderateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateContentInputSchema = z.object({
  content: z.string().describe('The content to be moderated (e.g., video description, comment text).'),
  contentType: z.enum(['video', 'comment']).describe('The type of content being moderated.'),
  communityGuidelines: z.string().describe('The community guidelines to adhere to.'),
});

export type ModerateContentInput = z.infer<typeof ModerateContentInputSchema>;

const ModerateContentOutputSchema = z.object({
  flagged: z.boolean().describe('Whether the content is flagged as potentially inappropriate.'),
  reason: z.string().describe('The reason for flagging the content, based on community guidelines and sentiment analysis.'),
  sentiment: z.string().describe('The sentiment of the content (positive, negative, neutral).'),
});

export type ModerateContentOutput = z.infer<typeof ModerateContentOutputSchema>;

export async function moderateContent(input: ModerateContentInput): Promise<ModerateContentOutput> {
  return moderateContentFlow(input);
}

const moderateContentPrompt = ai.definePrompt({
  name: 'moderateContentPrompt',
  input: {schema: ModerateContentInputSchema},
  output: {schema: ModerateContentOutputSchema},
  prompt: `You are an AI content moderator for Yappzy, a short video social media app.

  Your task is to analyze the given content and determine if it violates the community guidelines.
  You should also perform sentiment analysis to detect potentially harmful or negative content.

  Community Guidelines: {{{communityGuidelines}}}

  Content Type: {{{contentType}}}
  Content: {{{content}}}

  Based on the content and the community guidelines, determine if the content should be flagged as inappropriate.
  Also, determine the overall sentiment of the content.

  Return your analysis in the following JSON format:
  {
    "flagged": true/false, // Whether the content violates the guidelines or has negative sentiment
    "reason": "Reason for flagging (if flagged=true), or a summary of why the content is acceptable (if flagged=false)",
    "sentiment": "positive/negative/neutral" // Overall sentiment of the content
  }`,
});

const moderateContentFlow = ai.defineFlow(
  {
    name: 'moderateContentFlow',
    inputSchema: ModerateContentInputSchema,
    outputSchema: ModerateContentOutputSchema,
  },
  async input => {
    const {output} = await moderateContentPrompt(input);
    return output!;
  }
);
