"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  Check,
  ChevronsUpDown,
  HomeIcon as House,
  Book,
  FlaskConical,
  Briefcase,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
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

interface FormData {
  name: string;
  teacher: string;
  room: string;
  color: string;
  icon: string;
}

const iconOptions = [
  { name: "House", icon: House },
  { name: "Book", icon: Book },
  { name: "FlaskConical", icon: FlaskConical },
  { name: "Briefcase", icon: Briefcase },
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
    formState: { errors },
  } = useForm<FormData>();

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
      <Link
        href="/subjects"
        className="fixed right-6 top-6 z-50 rounded-full bg-background p-3 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <X className="h-6 w-6" />
      </Link>

      <div className="relative mx-auto max-w-2xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">{t("subjects.add.title")}</h1>
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
                            <div
                              className={`h-4 w-4 rounded bg-${color}-500`}
                            />
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
                                ?.icon || House,
                              { className: "mr-2 h-4 w-4" },
                            )}
                            {field.value}
                          </span>
                        ) : (
                          <span>{t("subjects.select_icon")}</span>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <ScrollArea className="h-[200px]">
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
                            <span>{icon.name}</span>
                          </div>
                        ))}
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
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
      </div>
    </>
  );
}
