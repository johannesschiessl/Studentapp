"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExamTypeGroup } from "@/types/exams";
import { useTranslation } from "@/hooks/use-translation";

interface AddExamTypeGroupDialogProps {
  onAdd: (group: Omit<ExamTypeGroup, "id" | "examTypes">) => void;
}

export function AddExamTypeGroupDialog({ onAdd }: AddExamTypeGroupDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<ExamTypeGroup, "id" | "examTypes">>();

  const onSubmit = (data: Omit<ExamTypeGroup, "id" | "examTypes">) => {
    onAdd(data);
    setIsOpen(false);
    reset();
  };
  const { t } = useTranslation();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full">{t("settings.exam_type.add_group")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("settings.exam_type.add_group.label")}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">{t("settings.exam_type.name")}</Label>
            <Input
              id="name"
              {...register("name", {
                required: t("settings.exam_type.name.required"),
              })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="weight">{t("settings.exam_type.weight")}</Label>
            <Input
              id="weight"
              type="number"
              step="0.01"
              {...register("weight", {
                required: t("settings.exam_type.weight.required"),
                valueAsNumber: true,
              })}
              aria-invalid={errors.weight ? "true" : "false"}
            />
            {errors.weight && (
              <p className="mt-1 text-sm text-destructive">
                {errors.weight.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit">{t("common.add")}</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
