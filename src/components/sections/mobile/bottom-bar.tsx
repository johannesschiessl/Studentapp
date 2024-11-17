"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  House,
  CalendarDays,
  FolderOpen,
  ListChecks,
  Blocks,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function BottomBar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { name: t("home"), icon: House, href: "/home" },
    { name: t("calendar"), icon: CalendarDays, href: "/calendar" },
    { name: t("subjects"), icon: FolderOpen, href: "/subjects" },
    { name: t("homeworks"), icon: ListChecks, href: "/homework" },
    { name: t("flashcards"), icon: Blocks, href: "/flashcards" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background pb-5 pt-2 shadow-lg sm:hidden">
      <ul className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.name}>
              <Link href={item.href}>
                <div className="flex flex-col items-center p-2">
                  <Icon
                    className={`h-6 w-6 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`mt-1 text-xs font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
