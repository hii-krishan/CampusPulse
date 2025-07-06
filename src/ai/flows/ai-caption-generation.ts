'use server';
/**
 * @fileOverview An AI agent for generating catchy captions for event descriptions.
 *
 * - generateCaption - A function that generates captions.
 * - GenerateCaptionInput - The input type for the generateCaption function.
 * - GenerateCaptionOutput - The return type for the generateCaption function.
 */


import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaptionInputSchema = z.object({
  eventDescription: z
    .string()
    .describe('The description of the event for which a caption is to be generated.'),
  eventType: z.string().describe('The type of event (e.g., workshop, concert, party).'),
  targetAudience: z
    .string()
    .describe('The target audience for the event (e.g., students, young professionals).'),
});
export type GenerateCaptionInput = z.infer<typeof GenerateCaptionInputSchema>;

const GenerateCaptionOutputSchema = z.object({
  caption: z.string().describe('A catchy caption for the event description.'),
});
export type GenerateCaptionOutput = z.infer<typeof GenerateCaptionOutputSchema>;

export async function generateCaption(input: GenerateCaptionInput): Promise<GenerateCaptionOutput> {
  return generateCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaptionPrompt',
  input: {schema: GenerateCaptionInputSchema},
  output: {schema: GenerateCaptionOutputSchema},
  prompt: `You are an AI caption generator for events.

You will generate a catchy caption for the event description, considering the event type and target audience.

Event Description: {{{eventDescription}}}
Event Type: {{{eventType}}}
Target Audience: {{{targetAudience}}}

Caption:`,
});

const generateCaptionFlow = ai.defineFlow(
  {
    name: 'generateCaptionFlow',
    inputSchema: GenerateCaptionInputSchema,
    outputSchema: GenerateCaptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
