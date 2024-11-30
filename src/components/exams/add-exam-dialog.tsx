"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Exam, ExamType, NewExam } from "@/types/exams";
import { useTranslation } from "@/hooks/use-translation";

interface AddExamDialogProps {
  examTypes: ExamType[];
  onAdd: (exam: NewExam) => void;
  children: React.ReactNode;
  gradingSystem: string;
}

export function AddExamDialog({
  children,
  onAdd,
  examTypes,
  gradingSystem,
}: AddExamDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Omit<Exam, "id" | "subject_id">>();

  const onSubmit = (data: Omit<Exam, "id" | "subject_id">) => {
    onAdd({
      ...data,
      exam_type_id: data.exam_type_id,
      date_written: new Date(data.date_written),
      date_returned: data.date_returned
        ? new Date(data.date_returned)
        : undefined,
    });
    setIsOpen(false);
    reset();
  };

  const onCancel = () => {
    setIsOpen(false);
    reset();
  };

  const { t } = useTranslation();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("exams.add_exam")}</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="exam_type">{t("exams.exam_type")}</Label>
            <Controller
              name="exam_type_id"
              control={control}
              rules={{ required: t("exams.exam_type.required") }}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("exams.select_exam_type")} />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.name}
                      </SelectItem>
                    ))}
                    <p className="py-2 text-center text-muted-foreground">
                      {t("exams.add_exam_type_in_settings")}
                    </p>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.exam_type_id && (
              <p className="mt-1 text-sm text-destructive">
                {errors.exam_type_id.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="grade">{t("exams.grade")}</Label>
            <Controller
              name="grade"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={"none"}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("exams.select_grade")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      {t("exams.no_grade_yet")}
                    </SelectItem>
                    {(gradingSystem === "de_full_grades"
                      ? [1, 2, 3, 4, 5, 6]
                      : [1, 2, 3, 4, 5]
                    ).map((grade) => (
                      <SelectItem key={grade} value={grade.toString()}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="grade_modifier">{t("exams.grade_modifier")}</Label>
            <Controller
              name="grade_modifier"
              control={control}
              defaultValue="none"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("exams.select_grade_modifier")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t("exams.none")}</SelectItem>
                    <SelectItem value="+">{t("exams.plus")}</SelectItem>
                    <SelectItem value="-">{t("exams.minus")}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="date_written">{t("exams.date_written")}</Label>
            <Input
              id="date_written"
              type="date"
              {...register("date_written", {
                required: t("exams.date_written.required"),
              })}
              aria-invalid={errors.date_written ? "true" : "false"}
            />
            {errors.date_written && (
              <p className="mt-1 text-sm text-destructive">
                {errors.date_written.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="date_returned">{t("exams.date_returned")}</Label>
            <Input
              id="date_returned"
              type="date"
              {...register("date_returned")}
            />
          </div>

          <div>
            <Label htmlFor="description">{t("exams.description")}</Label>
            <Textarea id="description" {...register("description")} />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              {t("common.cancel")}
            </Button>
            <Button type="submit">{t("common.add")}</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
