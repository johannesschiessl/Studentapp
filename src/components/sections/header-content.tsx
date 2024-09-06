"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/contexts/sidebar-context";

export function HeaderContent(user: any) {
  const { isOpen: isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <header className="fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-background p-2 pt-8 sm:p-4 sm:pt-4">
      {/* Desktop */}

      <div
        className={`hidden items-center transition-opacity duration-500 ease-in-out sm:flex ${
          isSidebarOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="rounded-[1rem] text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700"
        >
          <PanelLeftOpen />
        </Button>
      </div>

      {/* Mobile */}

      <div className="flex w-full items-center justify-between sm:hidden"></div>

      {/* Desktop */}

      <div className="hidden items-center gap-4 md:flex">
        <Avatar>
          <AvatarImage src={user?.user?.user_metadata.avatar_url} />
          <AvatarFallback>
            {user?.user?.user_metadata.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
