"use client";

import { useState } from "react";
import { FlashcardDeck, Flashcard, NewDeck } from "@/types/flashcards";
import { Subject } from "@/types/subjects";
import { DeckList } from "./deck-list";
import { AddDeckDialog } from "./add-deck-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { addDeck } from "@/app/actions/flashcards";
import { useTranslation } from "@/hooks/use-translation";

interface FlashcardsContentProps {
  initialDecks: FlashcardDeck[];
  subjects: Subject[];
  deckCards: Record<number, Flashcard[]>;
}

export function FlashcardsContent({
  initialDecks,
  subjects,
  deckCards,
}: FlashcardsContentProps) {
  const [decks, setDecks] = useState<FlashcardDeck[]>(initialDecks);

  const { t } = useTranslation();

  async function handleAddDeck(
    input: Omit<NewDeck, "description"> & { description?: string },
  ) {
    try {
      const deck: NewDeck = {
        ...input,
        description: input.description || "",
      };
      const createdDeck = await addDeck(deck);
      setDecks((prev) => [...prev, createdDeck]);
    } catch (error) {
      console.error("Failed to create deck:", error);
      throw error;
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">{t("flashcards")}</h1>
        <AddDeckDialog subjects={subjects} onAdd={handleAddDeck}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("flashcards.add_deck")}
          </Button>
        </AddDeckDialog>
      </div>

      <DeckList decks={decks} subjects={subjects} deckCards={deckCards} />
    </div>
  );
}
