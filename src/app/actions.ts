"use server";

import { generateCaption, GenerateCaptionInput } from "@/ai/flows/ai-caption-generation";
import { getEventSuggestions, GetEventSuggestionsInput } from "@/ai/flows/ai-event-suggestions";
import { posterAssistance, PosterAssistanceInput } from "@/ai/flows/ai-poster-assistance";

// A helper function to wrap AI calls with error handling
async function handleAICall<TInput, TOutput>(
  aiFunction: (input: TInput) => Promise<TOutput>,
  input: TInput
): Promise<{ success: boolean; data?: TOutput; error?: string }> {
  try {
    const data = await aiFunction(input);
    return { success: true, data };
  } catch (error) {
    console.error("AI Action Error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

export async function getEventSuggestionsAction(input: GetEventSuggestionsInput) {
    return handleAICall(getEventSuggestions, input);
}

export async function generateCaptionAction(input: GenerateCaptionInput) {
    return handleAICall(generateCaption, input);
}

export async function posterAssistanceAction(input: PosterAssistanceInput) {
    return handleAICall(posterAssistance, input);
}
