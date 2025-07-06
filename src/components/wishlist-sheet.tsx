"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet";
import { useWishlist } from "@/context/wishlist-context";
import { Button } from "./ui/button";
import Image from "next/image";
import { Calendar, MapPin, X } from "lucide-react";

export function WishlistSheet({ children }: { children: React.ReactNode }) {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-headline">Your Wishlist</SheetTitle>
          <SheetDescription>
            Events you're interested in.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4 h-full overflow-y-auto pb-20">
          {wishlist.length > 0 ? (
            wishlist.map((event) => (
              <div key={event.id} className="flex gap-4 p-2 rounded-lg relative group bg-secondary/50">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover w-20 h-20"
                  data-ai-hint={event.aiHint}
                />
                <div className="flex-1">
                  <h3 className="font-semibold font-headline">{event.title}</h3>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3"/>
                    <span>{event.date}</span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3"/>
                    <span>{event.location}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFromWishlist(event.id)}
                >
                  <X className="w-4 h-4"/>
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center mt-8">Your wishlist is empty.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
