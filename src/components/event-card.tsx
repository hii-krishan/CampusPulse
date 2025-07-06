"use client";

import Image from 'next/image';
import type { Event } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { useWishlist } from '@/context/wishlist-context';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(event.id);

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
        <Badge className="absolute top-2 right-2 z-10 bg-primary/80 backdrop-blur-sm">{event.category}</Badge>
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
          <Button className="flex-grow" onClick={handleRegisterClick}>Register Now</Button>
          <Button variant="outline" size="icon" onClick={handleWishlistClick} aria-label="Add to wishlist">
            <Heart className={cn("w-5 h-5", wishlisted && "fill-primary text-primary")} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
