"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  Check,
  ChevronsUpDown,
  Book,
  FlaskConical,
  Briefcase,
  Loader2,
  Calculator,
  Coffee,
  Scroll,
  Leaf,
  Atom,
  Terminal,
  Hourglass,
  Earth,
  Scale,
  Music,
  Church,
  Palette,
  Dumbbell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Subject } from "@/types/subjects";
import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "@/hooks/use-translation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSubject } from "@/app/actions/subjects";
import { SUBJECT_PRESETS } from "@/constants/subject-presets";

interface FormData {
  name: string;
  teacher: string;
  room: string;
  color: string;
  icon: string;
}

const iconOptions = [
  { name: "Book", icon: Book },
  { name: "Calculator", icon: Calculator },
  { name: "Coffee", icon: Coffee },
  { name: "Scroll", icon: Scroll },
  { name: "Leaf", icon: Leaf },
  { name: "FlaskConical", icon: FlaskConical },
  { name: "Atom", icon: Atom },
  { name: "Terminal", icon: Terminal },
  { name: "Hourglass", icon: Hourglass },
  { name: "Earth", icon: Earth },
  { name: "Briefcase", icon: Briefcase },
  { name: "Scale", icon: Scale },
  { name: "Music", icon: Music },
  { name: "Church", icon: Church },
  { name: "Palette", icon: Palette },
  { name: "Dumbbell", icon: Dumbbell },
];

export default function NewSubjectPage() {
  const [openIcon, setOpenIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const handlePresetChange = (presetName: string) => {
    const preset = SUBJECT_PRESETS.find((p) => p.name === presetName);
    if (preset) {
      setValue("name", preset.name);
      setValue("color", preset.color);
      setValue("icon", preset.icon);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const subject: Omit<Subject, "id"> = {
        name: data.name,
        teacher: data.teacher || undefined,
        room: data.room || undefined,
        color: data.color,
        icon: data.icon,
      };

      await createSubject(subject);
      router.push("/subjects");
    } catch (error) {
      console.error("Failed to create subject:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 pt-8 text-center">
        <h1 className="text-3xl font-bold">{t("subjects.add.title")}</h1>
      </div>

      <div className="mb-8">
        <Label htmlFor="preset">{t("subjects.preset")}</Label>
        <Select onValueChange={handlePresetChange}>
          <SelectTrigger>
            <SelectValue placeholder={t("subjects.select_preset")} />
          </SelectTrigger>
          <SelectContent>
            {SUBJECT_PRESETS.map((preset) => (
              <SelectItem key={preset.name} value={preset.name}>
                <div className="flex items-center gap-2">
                  {React.createElement(
                    iconOptions.find((i) => i.name === preset.icon)?.icon ||
                      Book,
                    { className: "mr-2 h-4 w-4" },
                  )}
                  {preset.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          <div>
            <Label htmlFor="name">{t("subjects.name")}</Label>
            <Input
              id="name"
              {...register("name", { required: t("subjects.name.required") })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="teacher">{t("subjects.teacher")}</Label>
            <Input id="teacher" {...register("teacher")} />
          </div>

          <div>
            <Label htmlFor="room">{t("subjects.room")}</Label>
            <Input id="room" {...register("room")} />
          </div>

          <div>
            <Label>{t("subjects.color")}</Label>
            <Controller
              name="color"
              control={control}
              rules={{ required: t("subjects.color.required") }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("subjects.select_color")} />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "slate",
                      "red",
                      "orange",
                      "amber",
                      "yellow",
                      "lime",
                      "green",
                      "emerald",
                      "teal",
                      "cyan",
                      "sky",
                      "blue",
                      "indigo",
                      "violet",
                      "purple",
                      "fuchsia",
                      "pink",
                      "rose",
                    ].map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className="flex items-center gap-2">
                          <div className={`h-4 w-4 rounded bg-${color}-500`} />
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label>{t("subjects.icon")}</Label>
            <Controller
              name="icon"
              control={control}
              rules={{ required: t("subjects.icon.required") }}
              render={({ field }) => (
                <Popover open={openIcon} onOpenChange={setOpenIcon}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openIcon}
                      className="w-full justify-between"
                    >
                      {field.value ? (
                        <span className="flex items-center">
                          {React.createElement(
                            iconOptions.find((i) => i.name === field.value)
                              ?.icon || Book,
                            { className: "mr-2 h-4 w-4" },
                          )}
                          {field.value === "Coffee" ? "Tea" : field.value}
                        </span>
                      ) : (
                        <span>{t("subjects.select_icon")}</span>
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <ScrollArea className="h-[200px] w-[250px]">
                      {iconOptions.map((icon) => (
                        <div
                          key={icon.name}
                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                          onClick={() => {
                            field.onChange(icon.name);
                            setOpenIcon(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === icon.name
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {React.createElement(icon.icon, {
                            className: "mr-2 h-4 w-4",
                          })}
                          <span>
                            {icon.name === "Coffee" ? "Tea" : icon.name}
                          </span>
                        </div>
                      ))}
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="mr-2">{t("common.creating")}</span>
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            t("subjects.add")
          )}
        </Button>
      </form>
    </>
  );
}
