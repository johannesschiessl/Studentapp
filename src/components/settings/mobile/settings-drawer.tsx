"use client";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useLanguage } from "@/contexts/language-context";
import {
  BookCheck,
  Languages,
  LogOut,
  Moon,
  Sun,
  Trash,
  UserRound,
  BarChart3,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/use-translation";
import Icon from "../../shared/icon";
import { languages } from "@/config/languages";
import { Button } from "../../ui/button";
import ExamSettingsContent from "../exams/exam-settings-content";
import {
  getExamTypeGroupsForCurrentSchoolYear,
  getExamTypesForCurrentSchoolYear,
} from "@/app/actions/exams";
import { useEffect, useState } from "react";
import { logOutUser, deleteUserAccount } from "@/app/actions/user";
import { ExamType, ExamTypeGroup } from "@/types/exams";
import { Badge } from "@/components/ui/badge";
import { SchoolYearSettings } from "@/types/school-year";
import { toast } from "sonner";
import { updateSchoolYearSettings } from "@/app/actions/school-year";
import { Switch } from "@/components/ui/switch";

interface SettingsDrawerProps {
  children: React.ReactNode;
  settings?: SchoolYearSettings;
}

export default function SettingsDrawer({
  children,
  settings: initialSettings,
}: SettingsDrawerProps) {
  const defaultSettings: SchoolYearSettings = {
    enableStatistics: false,
  };

  const [settings, setSettings] = useState<SchoolYearSettings>(
    initialSettings || defaultSettings,
  );
  const [initialExamTypeGroups, setInitialExamTypeGroups] = useState<
    ExamTypeGroup[]
  >([]);
  const [initialExamTypes, setInitialExamTypes] = useState<ExamType[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function getInitialData() {
      const examTypeGroups = await getExamTypeGroupsForCurrentSchoolYear();
      const examTypes = await getExamTypesForCurrentSchoolYear();
      setInitialExamTypeGroups(examTypeGroups);
      setInitialExamTypes(examTypes);
    }
    getInitialData();
  }, []);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  async function handleSettingChange(
    key: keyof SchoolYearSettings,
    value: boolean,
  ) {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    try {
      await updateSchoolYearSettings(newSettings);
    } catch (error) {
      setSettings(settings);
      console.error("Failed to update settings:", error);
      toast.error(t("common.error"));
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>{t("settings")}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-4">
          <SettingsItem>
            <div className="flex items-center">
              <Icon className="mr-2">
                <Sun className="h-5 w-5 dark:hidden" />
                <Moon className="hidden h-5 w-5 dark:block" />
              </Icon>
              {t("settings.theme")}
            </div>
            <Select onValueChange={(value) => setTheme(value)} value={theme}>
              <SelectTrigger className="w-[140px]">
                <SelectValue>
                  {theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">
                  {t("settings.theme.system")}
                </SelectItem>
                <SelectItem value="light">
                  {t("settings.theme.light")}
                </SelectItem>
                <SelectItem value="dark">{t("settings.theme.dark")}</SelectItem>
              </SelectContent>
            </Select>
          </SettingsItem>

          <SettingsItem>
            <div className="flex items-center">
              <Icon className="mr-2">
                <Languages className="h-5 w-5" />
              </Icon>
              {t("settings.language")}
            </div>
            <Select
              onValueChange={(value: "en" | "de") => setLanguage(value)}
              value={language}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue>{t(`settings.language.${language}`)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {t(`settings.language.${lang}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SettingsItem>

          <SettingsItem>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <Icon className="mr-2">
                  <BarChart3 className="h-5 w-5" />
                </Icon>
                <div className="flex flex-col">
                  <span>{t("settings.statistics.enable")}</span>
                  <span className="text-sm text-muted-foreground">
                    {t("settings.statistics.description")}
                  </span>
                </div>
              </div>
              <Switch
                checked={settings.enableStatistics}
                onCheckedChange={() =>
                  handleSettingChange(
                    "enableStatistics",
                    !settings.enableStatistics,
                  )
                }
              />
            </div>
          </SettingsItem>

          <SettingsItem>
            <div className="flex items-center">
              <Icon className="mr-2">
                <BookCheck className="h-5 w-5" />
              </Icon>
              {t("settings.exam_types")}
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                  {t("common.manage")}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[85vh]">
                <DrawerHeader>
                  <DrawerTitle>{t("settings.exam_types")}</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <ExamSettingsContent
                    initialExamTypeGroups={initialExamTypeGroups}
                    initialExamTypes={initialExamTypes}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </SettingsItem>

          <SettingsItem>
            <div className="flex items-center">
              <Icon className="mr-2">
                <UserRound className="h-5 w-5" />
              </Icon>
              {t("settings.account")}
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                  {t("common.manage")}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[85vh]">
                <DrawerHeader>
                  <DrawerTitle>{t("settings.account")}</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-4 p-4">
                  <SettingsItem>
                    <div className="flex items-center">
                      <Icon className="mr-2">
                        <LogOut className="h-5 w-5" />
                      </Icon>
                      {t("settings.logout")}
                    </div>
                    <Button
                      onClick={() => logOutUser()}
                      variant="outline"
                      className="w-[140px]"
                    >
                      {t("settings.logout")}
                    </Button>
                  </SettingsItem>

                  <SettingsItem>
                    <div className="flex items-center">
                      <Icon className="mr-2">
                        <Trash className="h-5 w-5" />
                      </Icon>
                      {t("settings.account.delete")}
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          variant="destructive"
                          className="w-[140px]"
                          disabled={isDeleting}
                        >
                          {isDeleting
                            ? t("common.loading")
                            : t("settings.account.delete.button")}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {t("settings.account.delete.confirm.title")}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {t("settings.account.delete.confirm.description")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            {t("common.cancel")}
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/80"
                            onClick={async (e) => {
                              e.preventDefault();
                              setIsDeleting(true);
                              try {
                                await deleteUserAccount();
                              } catch (error) {
                                console.error(
                                  "Failed to delete account:",
                                  error,
                                );
                                setIsDeleting(false);
                              }
                            }}
                          >
                            {t("settings.account.delete.button")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </SettingsItem>
                </div>
              </DrawerContent>
            </Drawer>
          </SettingsItem>
        </div>

        <DrawerFooter className="flex w-full flex-col items-center justify-between">
          <p className="text-sm text-neutral-500">Studentapp</p>
          <p className="text-sm text-neutral-500">by Johannes Schießl</p>
          <Badge className="ml-1 mr-2 bg-indigo-100 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-500">
            Public Beta
          </Badge>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function SettingsItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-between rounded-lg py-2 text-neutral-700 dark:text-neutral-300">
      {children}
    </div>
  );
}
