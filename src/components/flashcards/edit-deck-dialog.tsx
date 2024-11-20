"use client";

import { useState } from "react";
import { FlashcardDeck } from "@/types/flashcards";
import { Subject } from "@/types/subjects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "@/hooks/use-translation";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  subject_id: z.number({
    required_error: "Please select a subject",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface EditDeckDialogProps {
  deck: FlashcardDeck;
  subjects: Subject[];
  onEdit: (deck: FlashcardDeck) => void;
  children: React.ReactNode;
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

export function EditDeckDialog({
  deck,
  subjects,
  onEdit,
  children,
}: EditDeckDialogProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: deck.name,
      description: deck.description,
      subject_id: deck.subject_id,
    },
  });

  async function onSubmit(data: FormData) {
    onEdit({
      ...deck,
      ...data,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("flashcards.edit_deck")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common.name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common.description")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("subject")}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("subject.select")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button type="submit">{t("common.save")}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
