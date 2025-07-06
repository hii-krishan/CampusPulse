"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Event } from '@/lib/types';
import { events } from '@/lib/mock-data';

interface WishlistContextType {
  wishlist: Event[];
  addToWishlist: (eventId: string) => void;
  removeFromWishlist: (eventId: string) => void;
  isWishlisted: (eventId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(Array.from(wishlistIds)));
  }, [wishlistIds]);

  const addToWishlist = (eventId: string) => {
    setWishlistIds(prev => new Set(prev).add(eventId));
  };

  const removeFromWishlist = (eventId: string) => {
    setWishlistIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(eventId);
      return newSet;
    });
  };

  const isWishlisted = (eventId: string) => {
    return wishlistIds.has(eventId);
  };
  
  const wishlist = events.filter(event => wishlistIds.has(event.id));

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
