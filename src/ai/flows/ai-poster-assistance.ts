'use server';

/**
 * @fileOverview An AI agent that provides assistance to event organizers
 *  in generating poster design layouts or suggestions from a prompt, so they
 *  can create visually appealing posters for their events more efficiently.
 *
 * - posterAssistance - A function that handles the poster assistance process.
 * - PosterAssistanceInput - The input type for the posterAssistance function.
 * - PosterAssistanceOutput - The return type for the posterAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PosterAssistanceInputSchema = z.object({
  prompt: z
    .string()
    .describe(
      'A detailed description of the desired poster, including the event, theme, and any specific elements to include.'
    ),
});
export type PosterAssistanceInput = z.infer<typeof PosterAssistanceInputSchema>;

const PosterAssistanceOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'AI-generated suggestions for the poster design, including layout ideas, color schemes, and image suggestions.'
    ),
});
export type PosterAssistanceOutput = z.infer<typeof PosterAssistanceOutputSchema>;

export async function posterAssistance(input: PosterAssistanceInput): Promise<PosterAssistanceOutput> {
  return posterAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'posterAssistancePrompt',
  input: {schema: PosterAssistanceInputSchema},
  output: {schema: PosterAssistanceOutputSchema},
  prompt: `You are an AI assistant specialized in generating creative poster design ideas.

  Based on the event organizer's prompt, suggest several design layouts, color schemes, and image suggestions to help create visually appealing posters.

  Consider the event, its theme, and any specific elements mentioned in the prompt to make the suggestions relevant.

  Prompt: {{{prompt}}}

  Provide the suggestions in a well-structured format.
  `,
});

const posterAssistanceFlow = ai.defineFlow(
  {
    name: 'posterAssistanceFlow',
    inputSchema: PosterAssistanceInputSchema,
    outputSchema: PosterAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
