"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { generateCaptionAction } from "@/app/actions";
import { Skeleton } from "./ui/skeleton";

export function CaptionGenerator() {
  const [formData, setFormData] = useState({
    eventDescription: '',
    eventType: '',
    targetAudience: ''
  });
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCaption('');
    const result = await generateCaptionAction(formData);
    if (result.success && result.data?.caption) {
      setCaption(result.data.caption);
    } else {
      setError(result.error || 'Failed to generate caption.');
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">AI Caption Generator</CardTitle>
        <CardDescription>Create catchy captions for your event descriptions.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventDescription">Event Description</Label>
            <Textarea 
              id="eventDescription" 
              name="eventDescription" 
              value={formData.eventDescription} 
              onChange={handleChange}
              placeholder="e.g., A full day of talks and workshops..." 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Input 
              id="eventType" 
              name="eventType" 
              value={formData.eventType}
              onChange={handleChange}
              placeholder="e.g., Conference, Workshop" 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input 
              id="targetAudience" 
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange} 
              placeholder="e.g., Students, Young Professionals" 
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            <Wand2 className="mr-2 h-4 w-4" />
            {loading ? 'Generating...' : 'Generate Caption'}
          </Button>
        </form>
        
        {(loading || error || caption) && (
            <div className="mt-6 p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold font-headline mb-2">Generated Caption:</h4>
                {loading && <Skeleton className="h-10 w-full" />}
                {error && <p className="text-destructive text-sm">{error}</p>}
                {caption && <p className="text-foreground">{caption}</p>}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
