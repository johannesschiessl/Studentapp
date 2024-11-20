"use client";

import { Flashcard, FlashcardDeck } from "@/types/flashcards";
import { Subject } from "@/types/subjects";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import SubjectIcon from "@/components/shared/subject-icon";
import { getCardsDuePractice } from "@/lib/flashcards";

interface DeckListProps {
  decks: FlashcardDeck[];
  subjects: Subject[];
  deckCards: Record<number, Flashcard[]>;
}

export function DeckList({ decks, subjects, deckCards }: DeckListProps) {
  function getSubject(subjectId: number) {
    return subjects.find((s) => s.id === subjectId);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => {
        const subject = getSubject(deck.subject_id);
        const cards = deckCards?.[deck.id] ?? [];
        const dueCount = getCardsDuePractice(cards);

        return (
          <Card key={deck.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  {subject && (
                    <SubjectIcon
                      icon={subject.icon}
                      color={subject.color}
                      size="default"
                    />
                  )}
                  <div>
                    <CardTitle>{deck.name}</CardTitle>
                    <CardDescription>{deck.description}</CardDescription>
                  </div>
                </div>
              </div>
              {dueCount > 0 && (
                <div className="absolute right-4 top-4">
                  <div
                    className={`bg-${subject?.color}-100 text-${subject?.color}-500 rounded-full px-2 py-1 text-xs`}
                  >
                    {dueCount} due
                  </div>
                </div>
              )}
            </CardHeader>
            <Link
              href={`/flashcards/deck/${deck.id}`}
              className="absolute inset-0"
            />
          </Card>
        );
      })}
      {decks.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground">
          No decks yet.
        </div>
      )}
    </div>
  );
}
