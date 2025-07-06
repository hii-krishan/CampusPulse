"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Event } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Heart, Instagram } from 'lucide-react';
import { useWishlist } from '@/context/wishlist-context';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { isToday, isFuture } from 'date-fns';

interface EventCardProps {
  event: Event;
}

type EventStatus = 'Upcoming' | 'Live' | 'Expired';

export function EventCard({ event }: EventCardProps) {
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const [status, setStatus] = useState<EventStatus | null>(null);
  const wishlisted = isWishlisted(event.id);

  useEffect(() => {
    const [year, month, day] = event.date.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day);

    if (isToday(eventDate)) {
      setStatus('Live');
    } else if (isFuture(eventDate)) {
      setStatus('Upcoming');
    } else {
      setStatus('Expired');
    }
  }, [event.date]);

  const handleWishlistClick = () => {
    if (wishlisted) {
      removeFromWishlist(event.id);
      toast({
        title: "Removed from wishlist",
        description: `"${event.title}" has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(event.id);
      toast({
        title: "Added to wishlist!",
        description: `"${event.title}" has been added to your wishlist.`,
      });
    }
  };
  
  const handleRegisterClick = () => {
    toast({
        title: "Registration successful!",
        description: `You have successfully registered for "${event.title}".`,
    });
  }

  return (
    <Card className="flex flex-col overflow-hidden h-full transform hover:-translate-y-1 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-2">
          {status && (
            <Badge
              variant={
                status === 'Expired' ? 'secondary' : 
                status === 'Live' ? 'destructive' : 'default'
              }
              className={cn(
                'pointer-events-none',
                status === 'Live' && 'animate-pulse'
              )}
            >
              {status}
            </Badge>
          )}
          <Badge className="bg-primary/80 backdrop-blur-sm pointer-events-none">{event.category}</Badge>
        </div>
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint={event.aiHint}
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{event.title}</CardTitle>
        <CardDescription className="text-muted-foreground mb-4 line-clamp-2">{event.description}</CardDescription>
        <div className="space-y-2 text-sm text-foreground">
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{event.location}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 bg-card">
        <div className="w-full flex items-center justify-between gap-2">
          <Button className="flex-grow" onClick={handleRegisterClick} disabled={status === 'Expired'}>
            {status === 'Expired' ? 'Event Expired' : 'Register Now'}
          </Button>
           {event.instagramPostUrl && (
            <Button variant="outline" size="icon" asChild>
                <a href={event.instagramPostUrl} target="_blank" rel="noopener noreferrer" aria-label="View on Instagram">
                    <Instagram className="w-5 h-5" />
                </a>
            </Button>
          )}
          <Button variant="outline" size="icon" onClick={handleWishlistClick} aria-label="Add to wishlist">
            <Heart className={cn("w-5 h-5", wishlisted && "fill-primary text-primary")} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
