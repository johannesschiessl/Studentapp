"use client";

import { Flashcard } from "@/types/flashcards";
import { Card } from "@/components/ui/card";
import { EditCardDialog } from "./edit-card-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
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
import { needsPractice } from "@/lib/flashcards";
import { cn } from "@/lib/utils";

interface CardListProps {
  cards: Flashcard[];
  onEdit: (card: Flashcard) => void;
  onDelete: (id: number) => void;
}

export function CardList({ cards, onEdit, onDelete }: CardListProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No cards in this deck yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {cards.map((card) => {
        const isPracticeDue = needsPractice(card);

        return (
          <Card
            key={card.id}
            className={cn("p-4", isPracticeDue && "border-primary")}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="font-medium">{card.front_text}</div>
                <div className="text-sm text-muted-foreground">
                  {card.back_text}
                </div>
              </div>
              <div className="flex gap-2">
                <EditCardDialog card={card} onEdit={onEdit}>
                  <Button size="icon" variant="ghost">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </EditCardDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Card</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this card? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(card.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <div>
                Level {card.level} • Practiced {card.times_practiced} times
              </div>
              {isPracticeDue && (
                <div className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                  Practice due
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
