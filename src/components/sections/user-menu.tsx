import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { logOutUser } from "@/app/actions/user";
import Icon from "../shared/icon";
import { ArrowLeftRight, CalendarDays, LogOut, Plus } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";

export default function UserMenu({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-full space-y-4">
        <MenuItem>
          <Link href="/years">
            <div className="flex items-center">
              <Icon className="mr-2">
                <ArrowLeftRight className="h-5 w-5" />
              </Icon>
              {t("settings.switch_year")}
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/new">
            <div className="flex items-center">
              <Icon className="mr-2">
                <Plus className="h-5 w-5" />
              </Icon>
              {t("settings.add_year")}
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/calendar/timetable">
            <div className="flex items-center">
              <Icon className="mr-2">
                <CalendarDays className="h-5 w-5" />
              </Icon>
              {t("settings.edit_timetable")}
            </div>
          </Link>
        </MenuItem>
        <MenuItem onClick={() => logOutUser()}>
          <div className="flex items-center">
            <Icon className="mr-2">
              <LogOut className="h-5 w-5" />
            </Icon>
            {t("settings.logout")}
          </div>
        </MenuItem>
      </PopoverContent>
    </Popover>
  );
}

function MenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-between rounded-[1rem] px-4 py-2 text-neutral-700 transition-all duration-200 ease-in-out hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-700"
    >
      {children}
    </div>
  );
}
