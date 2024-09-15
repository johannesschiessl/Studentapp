import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { logOutUser } from "@/app/actions/user";
import Icon from "../shared/icon";
import {
  ArrowLeftRight,
  Languages,
  LogOut,
  Moon,
  Plus,
  Sun,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/language-context";
import { languages } from "@/config/languages";

export default function UserMenu({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="space-y-4">
        <MenuItem>
          <div className="flex items-center">
            <Icon className="mr-2">
              <ArrowLeftRight className="h-5 w-5" />
            </Icon>
            Switch school year
          </div>
        </MenuItem>
        <MenuItem>
          <div className="flex items-center">
            <Icon className="mr-2">
              <Plus className="h-5 w-5" />
            </Icon>
            Add school year
          </div>
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
