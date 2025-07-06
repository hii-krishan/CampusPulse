"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { posterAssistanceAction } from "@/app/actions";
import { Skeleton } from "./ui/skeleton";

export function PosterAssistant() {
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuggestions('');
    const result = await posterAssistanceAction({ prompt });
    if (result.success && result.data?.suggestions) {
      setSuggestions(result.data.suggestions);
    } else {
      setError(result.error || 'Failed to get suggestions.');
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">AI Poster Assistant</CardTitle>
        <CardDescription>Get design ideas and layouts for your event poster.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Poster Description</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your event, theme, and desired vibe for the poster..."
              className="min-h-[100px]"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            <Wand2 className="mr-2 h-4 w-4" />
            {loading ? 'Assisting...' : 'Get Assistance'}
          </Button>
        </form>

        {(loading || error || suggestions) && (
            <div className="mt-6 p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold font-headline mb-2">AI Suggestions:</h4>
                {loading && (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                )}
                {error && <p className="text-destructive text-sm">{error}</p>}
                {suggestions && <p className="text-foreground whitespace-pre-wrap text-sm">{suggestions}</p>}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
