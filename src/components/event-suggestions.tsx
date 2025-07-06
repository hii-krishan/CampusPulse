"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Wand2 } from 'lucide-react';
import { getEventSuggestionsAction } from '@/app/actions';
import { Skeleton } from './ui/skeleton';

export function EventSuggestions() {
  const [interests, setInterests] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuggestions([]);
    
    const result = await getEventSuggestionsAction({ userInterests: interests });

    if (result.success && result.data?.suggestedEvents) {
      setSuggestions(result.data.suggestedEvents.split(',').map(s => s.trim()));
    } else {
      setError(result.error || 'Failed to get suggestions.');
    }
    setLoading(false);
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
                <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Find Your Vibe</CardTitle>
        </div>
        <CardDescription>
          Not sure what to look for? Tell us your interests, and our AI will suggest events for you!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
          <Input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., coding, live music, startups"
            className="flex-grow"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !interests}>
            <Wand2 className="mr-2 h-4 w-4" />
            {loading ? 'Suggesting...' : 'Get Suggestions'}
          </Button>
        </form>
        {loading && (
            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-2/3" />
            </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {suggestions.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2 font-headline">Here are some ideas:</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
