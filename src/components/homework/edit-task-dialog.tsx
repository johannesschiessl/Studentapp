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
import { Task } from "@/types/homework";
import { Subject } from "@/types/subjects";
import { useTranslation } from "@/hooks/use-translation";

interface EditHomeworkDialogProps {
  children: React.ReactNode;
  subjects: Subject[];
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

interface FormData {
  task: string;
  due_date: string;
  subject_id: string;
}

export default function EditTaskDialog({
  children,
  subjects,
  task,
  onEdit,
  onDelete,
}: EditHomeworkDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const updatedTask: Task = {
      id: task.id,
      task: data.task,
      done: task.done,
      due_date: new Date(data.due_date),
      subject_id: data.subject_id === "none" ? null : Number(data.subject_id),
      school_year_id: task.school_year_id,
    };

    onEdit(updatedTask);
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
          <AlertDialogTitle>{t("homework.edit_task")}</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="task">{t("homework.task")}</Label>
            <Input
              id="task"
              defaultValue={task.task}
              {...register("task", { required: t("homework.task.required") })}
              aria-invalid={errors.task ? "true" : "false"}
            />
            {errors.task && (
              <p className="mt-1 text-sm text-destructive">
                {errors.task.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="due_date">{t("homework.due_date")}</Label>
            <Input
              id="due_date"
              type="date"
              defaultValue={new Date(task.due_date).toISOString().split("T")[0]}
              {...register("due_date", {
                required: t("homework.due_date.required"),
              })}
              aria-invalid={errors.task ? "true" : "false"}
            />
            {errors.due_date && (
              <p className="mt-1 text-sm text-destructive">
                {errors.due_date.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="subject_id">{t("homework.subject")}</Label>
            <Controller<FormData>
              name="subject_id"
              control={control}
              defaultValue={task.subject_id?.toString() ?? "none"}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      <SubjectOption name="General" color="neutral" />
                    </SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem
                        key={subject.id}
                        value={subject.id.toString()}
                      >
                        <SubjectOption
                          name={subject.name}
                          color={subject.color}
                        />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="delete">{t("homework.delete.label")}</Label>
            <DeleteTaskDialog task={task} onDelete={() => onDelete(task.id)}>
              <Button type="button" variant="destructive">
                {t("homework.delete")}
              </Button>
            </DeleteTaskDialog>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              {t("common.cancel")}
            </Button>
            <Button type="submit">{t("homework.edit")}</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function SubjectOption({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center">
      <div
        className={`mr-2 h-4 w-4 rounded bg-${color}-500`}
        aria-hidden="true"
      />
      <span>{name}</span>
    </div>
  );
}

function DeleteTaskDialog({
  task,
  onDelete,
  children,
}: {
  task: Task;
  onDelete: (id: number) => void;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("homework.delete.confirm")}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {t("homework.delete.confirm.description")}
        </AlertDialogDescription>
        <div className="flex items-center justify-end space-x-2">
          <AlertDialogCancel asChild>
            <Button variant="outline">{t("common.cancel")}</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            asChild
          >
            <Button onClick={() => onDelete(task.id)}>
              {t("homework.delete")}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
