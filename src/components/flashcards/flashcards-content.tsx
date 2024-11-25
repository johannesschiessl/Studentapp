"use client";

import { useState } from "react";
import { FlashcardDeck, Flashcard, NewDeck } from "@/types/flashcards";
import { Subject } from "@/types/subjects";
import { DeckList } from "./deck-list";
import { AddDeckDialog } from "./add-deck-dialog";
import { AddAiDeckDialog } from "./add-ai-deck-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { addDeck } from "@/app/actions/flashcards";
import { useTranslation } from "@/hooks/use-translation";
import { AiCreditsCounter } from "./ai-credits-counter";

interface FlashcardsContentProps {
  initialDecks: FlashcardDeck[];
  subjects: Subject[];
  deckCards: Record<number, Flashcard[]>;
  schoolYearId: number;
  aiCreditsUsed: number;
}

export function FlashcardsContent({
  initialDecks,
  subjects,
  deckCards,
  schoolYearId,
  aiCreditsUsed,
}: FlashcardsContentProps) {
  const [decks, setDecks] = useState<FlashcardDeck[]>(initialDecks);

  const { t } = useTranslation();

  async function handleAddDeck(
    input: Omit<NewDeck, "description" | "school_year_id"> & {
      description?: string;
    },
  ) {
    try {
      const deck: NewDeck = {
        ...input,
        description: input.description || "",
        school_year_id: schoolYearId,
      };
      const createdDeck = await addDeck(deck);
      setDecks((prev) => [...prev, createdDeck]);
    } catch (error) {
      console.error("Failed to create deck:", error);
      throw error;
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Flashcards</h1>
          <AiCreditsCounter usedCredits={aiCreditsUsed} />
        </div>
        <div className="flex gap-2">
          <AddAiDeckDialog />
          <AddDeckDialog subjects={subjects} onAdd={handleAddDeck}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("flashcards.add_deck")}
            </Button>
          </AddDeckDialog>
        </div>
      </div>
      <DeckList decks={decks} subjects={subjects} deckCards={deckCards} />
    </div>
  );
}
