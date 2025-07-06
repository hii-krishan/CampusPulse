"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import React from "react";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
