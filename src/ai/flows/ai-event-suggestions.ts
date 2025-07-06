'use server';

/**
 * @fileOverview An AI agent that provides personalized event recommendations based on user interests.
 *
 * - getEventSuggestions - A function that returns event suggestions for a user.
 * - GetEventSuggestionsInput - The input type for the getEventSuggestions function.
 * - GetEventSuggestionsOutput - The return type for the getEventSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetEventSuggestionsInputSchema = z.object({
  userInterests: z
    .string()
    .describe('A comma-separated list of the user\u2019s interests.'),
  recentEvents: z
    .string()
    .optional()
    .describe('A comma-separated list of the user\u2019s recent events.'),
});
export type GetEventSuggestionsInput = z.infer<typeof GetEventSuggestionsInputSchema>;

const GetEventSuggestionsOutputSchema = z.object({
  suggestedEvents: z
    .string()
    .describe('A comma-separated list of event names that the user might be interested in.'),
});
export type GetEventSuggestionsOutput = z.infer<typeof GetEventSuggestionsOutputSchema>;

export async function getEventSuggestions(
  input: GetEventSuggestionsInput
): Promise<GetEventSuggestionsOutput> {
  return getEventSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getEventSuggestionsPrompt',
  input: {schema: GetEventSuggestionsInputSchema},
  output: {schema: GetEventSuggestionsOutputSchema},
  prompt: `You are an event recommendation expert. Based on the user's interests and recent event history,
you will provide a list of event suggestions that the user might be interested in.

User Interests: {{{userInterests}}}
Recent Events: {{{recentEvents}}}

Suggested Events:`,
});

const getEventSuggestionsFlow = ai.defineFlow(
  {
    name: 'getEventSuggestionsFlow',
    inputSchema: GetEventSuggestionsInputSchema,
    outputSchema: GetEventSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
