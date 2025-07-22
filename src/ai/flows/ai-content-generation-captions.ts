// use server'

/**
 * @fileOverview AI-powered content generation for video captions and tags.
 *
 * - generateCaptionsAndTags - A function that generates video captions and tags.
 * - GenerateCaptionsAndTagsInput - The input type for the generateCaptionsAndTags function.
 * - GenerateCaptionsAndTagsOutput - The return type for the generateCaptionsAndTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaptionsAndTagsInputSchema = z.object({
  videoDescription: z.string().describe('A description of the video content.'),
});

export type GenerateCaptionsAndTagsInput = z.infer<typeof GenerateCaptionsAndTagsInputSchema>;

const GenerateCaptionsAndTagsOutputSchema = z.object({
  captions: z.array(z.string()).describe('Suggested video captions.'),
  tags: z.array(z.string()).describe('Suggested video tags.'),
});

export type GenerateCaptionsAndTagsOutput = z.infer<typeof GenerateCaptionsAndTagsOutputSchema>;

export async function generateCaptionsAndTags(
  input: GenerateCaptionsAndTagsInput
): Promise<GenerateCaptionsAndTagsOutput> {
  return generateCaptionsAndTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaptionsAndTagsPrompt',
  input: {schema: GenerateCaptionsAndTagsInputSchema},
  output: {schema: GenerateCaptionsAndTagsOutputSchema},
  prompt: `You are a social media expert specializing in creating engaging video captions and relevant tags.

  Based on the video content description provided, generate a list of captions and tags that are likely to increase video discoverability and engagement.

  Content Description: {{{videoDescription}}}

  Captions:
  - (A list of 3-5 creative and attention-grabbing captions)

  Tags:
  - (A list of 5-10 relevant and specific tags)`,
});

const generateCaptionsAndTagsFlow = ai.defineFlow(
  {
    name: 'generateCaptionsAndTagsFlow',
    inputSchema: GenerateCaptionsAndTagsInputSchema,
    outputSchema: GenerateCaptionsAndTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
