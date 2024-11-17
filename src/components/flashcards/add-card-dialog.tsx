"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "@/hooks/use-translation";
import { toast } from "sonner";
import { Flashcard } from "@/types/flashcards";

const formSchema = z.object({
  front_text: z.string().min(1, "Front text is required"),
  back_text: z.string().min(1, "Back text is required"),
});

type FormData = z.infer<typeof formSchema>;

interface AddCardDialogProps {
  deck: {
    id: number;
    name: string;
  };
  onAdd: (
    card: Omit<Flashcard, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  children: React.ReactNode;
}

export function AddCardDialog({ deck, onAdd, children }: AddCardDialogProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      front_text: "",
      back_text: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      await onAdd({
        ...data,
        deck_id: deck.id,
        level: 0,
        times_practiced: 0,
        last_practiced_at: null,
        next_practice_at: null,
      });

      // Reset form but keep dialog open
      form.reset();

      // Show success toast
      toast.success(t("flashcards.card_added_successfully"));

      // Focus the first input for quick entry of next card
      const firstInput = document.querySelector<HTMLTextAreaElement>(
        'textarea[name="front_text"]',
      );
      if (firstInput) {
        firstInput.focus();
      }
    } catch (error) {
      console.error("Failed to add card:", error);
      toast.error(t("flashcards.card_add_error"));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("flashcards.add_card")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="front_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("flashcards.front")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("flashcards.front_placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="back_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("flashcards.back")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("flashcards.back_placeholder")}
                      {...field}
                    />
                  </FormControl>
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
                {t("common.done")}
              </Button>
              <Button type="submit">{t("flashcards.add_card")}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
