"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutDashboard, PlusCircle, Sparkles, Command } from "lucide-react";
import React, { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/organizer");
    }
  }, [user, loading, router]);

  const menuItems = [
    {
      href: "/organizer",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/organizer/create",
      label: "Create Event",
      icon: PlusCircle,
    },
    {
      href: "/organizer/tools",
      label: "AI Tools",
      icon: Sparkles,
    },
  ];

  if (loading || !user) {
    return (
      <div className="flex">
        <div className="hidden md:block">
          <div className="w-64 p-4 space-y-4 border-r">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
        <div className="flex-1 p-8 space-y-8">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="w-full h-96" />
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Command className="w-6 h-6 text-primary"/>
            <span className="text-lg font-bold font-headline text-foreground">CampusPulse</span>
          </div>
        </SidebarHeader>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton isActive={pathname === item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-8">
          <div className="md:hidden mb-4">
             <SidebarTrigger />
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
