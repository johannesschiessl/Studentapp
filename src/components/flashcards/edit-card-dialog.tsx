"use client";

import { useState } from "react";
import { Flashcard } from "@/types/flashcards";
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

const formSchema = z.object({
  front_text: z.string().min(1, "Front text is required"),
  back_text: z.string().min(1, "Back text is required"),
});

type FormData = z.infer<typeof formSchema>;

interface EditCardDialogProps {
  card: Flashcard;
  onEdit: (card: Flashcard) => void;
  children: React.ReactNode;
}

export function EditCardDialog({
  card,
  onEdit,
  children,
}: EditCardDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      front_text: card.front_text,
      back_text: card.back_text,
    },
  });

  async function onSubmit(data: FormData) {
    onEdit({
      ...card,
      ...data,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Card</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="front_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Front</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the front text of the card"
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
                  <FormLabel>Back</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the back text of the card"
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
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
