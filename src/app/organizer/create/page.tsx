"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Event Created!",
      description: "Your new event has been successfully created.",
    });
    router.push('/organizer');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Create a New Event</h1>
        <p className="text-muted-foreground">Fill in the details below to add a new event to CampusPulse.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" placeholder="e.g., InnovateX Tech Conference" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., Conference, Workshop" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea id="description" placeholder="Describe your event in a few words..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Engineering Hall Auditorium" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" placeholder="https://placehold.co/600x400.png" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagramPostUrl">Instagram Post URL</Label>
              <Input id="instagramPostUrl" placeholder="https://instagram.com/p/..." />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Create Event</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
