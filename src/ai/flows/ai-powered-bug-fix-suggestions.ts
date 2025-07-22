'use server';
/**
 * @fileOverview An AI-powered bug fix suggestion agent.
 *
 * - suggestBugFix - A function that suggests bug fixes based on error logs.
 * - SuggestBugFixInput - The input type for the suggestBugFix function.
 * - SuggestBugFixOutput - The return type for the suggestBugFix function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBugFixInputSchema = z.object({
  errorLogs: z
    .string()
    .describe('The error logs from the application, including stack traces and any relevant context.'),
  codebaseSnippet: z
    .string()
    .optional()
    .describe('A relevant snippet of the codebase where the error occurred, if available.'),
  programmingLanguage: z
    .string()
    .default('TypeScript')
    .describe('The programming language of the codebase.'),
});
export type SuggestBugFixInput = z.infer<typeof SuggestBugFixInputSchema>;

const SuggestBugFixOutputSchema = z.object({
  suggestedFix: z
    .string()
    .describe('A code snippet or detailed explanation of the suggested fix for the bug.'),
  confidenceLevel: z
    .number()
    .min(0)
    .max(1)
    .describe('A confidence level (0 to 1) indicating the reliability of the suggested fix.'),
  explanation: z
    .string()
    .describe('A detailed explanation of why the suggested fix is likely to resolve the bug.'),
});
export type SuggestBugFixOutput = z.infer<typeof SuggestBugFixOutputSchema>;

export async function suggestBugFix(input: SuggestBugFixInput): Promise<SuggestBugFixOutput> {
  return suggestBugFixFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBugFixPrompt',
  input: {schema: SuggestBugFixInputSchema},
  output: {schema: SuggestBugFixOutputSchema},
  prompt: `You are an AI assistant specializing in debugging and providing code fix suggestions.

You will analyze the provided error logs and, if available, the codebase snippet to suggest a fix for the bug.

Error Logs:
\`\`\`
{{{errorLogs}}}
\`\`\`

Codebase Snippet (if available):
\`\`\`
{{{codebaseSnippet}}}
\`\`\`

Programming Language: {{{programmingLanguage}}}

Based on the information above, provide a suggested fix, a confidence level (0 to 1) indicating the reliability of the fix, and a detailed explanation of why the suggested fix is likely to resolve the bug.

Ensure that the suggestedFix is a valid and complete code snippet that can be directly applied to the codebase.

Output your response in JSON format:
`,
});

const suggestBugFixFlow = ai.defineFlow(
  {
    name: 'suggestBugFixFlow',
    inputSchema: SuggestBugFixInputSchema,
    outputSchema: SuggestBugFixOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
