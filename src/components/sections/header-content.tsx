"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Ellipsis, PanelLeftOpen, Settings } from "lucide-react";
import { useSidebar } from "@/contexts/sidebar-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "@/hooks/use-translation";
import SettingsDialog from "../settings/settings-dialog";
import UserMenu from "./user-menu";
import type { User } from "@supabase/supabase-js";
import SettingsDrawer from "../settings/mobile/settings-drawer";
import { SchoolYearSettings } from "@/types/school-year";

interface HeaderContentProps {
  user?: User;
  settings?: SchoolYearSettings;
}

export function HeaderContent({ user, settings }: HeaderContentProps) {
  const { isOpen: isSidebarOpen, toggleSidebar } = useSidebar();
  const { t } = useTranslation();

  return (
    <header className="fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-background p-2 pt-8 sm:p-4 sm:pt-4">
      {/* Desktop */}

      <div
        className={`hidden items-center transition-opacity duration-500 ease-in-out sm:flex ${
          isSidebarOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleSidebar}
                variant="ghost"
                size="icon"
                className="rounded-[1rem] text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                <PanelLeftOpen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("sidebar.open")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Mobile */}

      <div className="flex w-full items-center justify-between sm:hidden">
        <SettingsDrawer settings={settings}>
          <Button variant="ghost" size="icon">
            <Ellipsis />
          </Button>
        </SettingsDrawer>
        <UserMenu>
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>
              {user?.user_metadata?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </UserMenu>
      </div>

      {/* Desktop */}

      <div className="hidden items-center gap-4 md:flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SettingsDialog settings={settings}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-[1rem] text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  <Settings />
                </Button>
              </SettingsDialog>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("settings.open")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <UserMenu>
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>
              {user?.user_metadata?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </UserMenu>
      </div>
    </header>
  );
}
