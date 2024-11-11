"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
import { Exam, ExamType } from "@/types/exams";
import { useTranslation } from "@/hooks/use-translation";

interface EditExamDialogProps {
  children: React.ReactNode;
  exam: Exam;
  onEdit: (exam: Exam) => void;
  onDelete: (id: number) => void;
  examTypes: ExamType[];
}

export function EditExamDialog({
  children,
  exam,
  onEdit,
  onDelete,
  examTypes,
}: EditExamDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Omit<Exam, "id" | "subject_id">>();

  const onSubmit = (data: Omit<Exam, "id" | "subject_id">) => {
    onEdit({
      ...data,
      id: exam.id,
      exam_type_id: data.exam_type_id,
      subject_id: exam.subject_id,
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
          <AlertDialogTitle>{t("exams.edit_exam")}</AlertDialogTitle>
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
                  defaultValue={exam.exam_type_id.toString()}
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
              defaultValue={exam.grade}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("exams.select_grade")} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((grade) => (
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
              defaultValue={exam.grade_modifier || "none"}
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
              defaultValue={
                new Date(exam.date_written).toISOString().split("T")[0]
              }
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
              defaultValue={
                exam.date_returned
                  ? new Date(exam.date_returned).toISOString().split("T")[0]
                  : undefined
              }
              {...register("date_returned")}
            />
          </div>

          <div>
            <Label htmlFor="description">{t("exams.description")}</Label>
            <Textarea
              id="description"
              defaultValue={exam.description}
              {...register("description")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="delete">{t("exams.delete.label")}</Label>
            <DeleteExamDialog exam={exam} onDelete={() => onDelete(exam.id)}>
              <Button type="button" variant="destructive">
                {t("exams.delete")}
              </Button>
            </DeleteExamDialog>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              {t("exams.cancel")}
            </Button>
            <Button type="submit">{t("exams.edit")}</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DeleteExamDialog({
  exam,
  onDelete,
  children,
}: {
  exam: Exam;
  onDelete: (id: number) => void;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("exams.delete.confirm")}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {t("exams.delete.confirm.description")}
        </AlertDialogDescription>
        <div className="flex items-center justify-end space-x-2">
          <AlertDialogCancel asChild>
            <Button variant="outline">{t("exams.cancel")}</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            asChild
          >
            <Button onClick={() => onDelete(exam.id)}>
              {t("exams.delete")}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
