"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Command } from 'lucide-react';
import { WishlistSheet } from './wishlist-sheet';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center gap-2">
            <Command className="w-6 h-6 text-primary"/>
            <span className="text-xl font-bold font-headline text-foreground">CampusPulse</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Events</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/organizer">Organizer Dashboard</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2">
            <WishlistSheet>
                <Button variant="ghost" size="icon">
                    <Heart />
                    <span className="sr-only">Open Wishlist</span>
                </Button>
            </WishlistSheet>
        </div>
      </div>
    </header>
  );
}
