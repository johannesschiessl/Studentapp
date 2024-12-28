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
    <main className="mx-auto w-full max-w-5xl space-y-5 px-4 sm:px-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold sm:text-2xl">{t("flashcards")}</h1>
            <AiCreditsCounter usedCredits={aiCreditsUsed} />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <AddAiDeckDialog />
            <AddDeckDialog subjects={subjects} onAdd={handleAddDeck}>
              <Button className="w-full justify-center sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                <span className="whitespace-nowrap">
                  {t("flashcards.add_deck")}
                </span>
              </Button>
            </AddDeckDialog>
          </div>
        </div>
        <div className="mb-4 rounded-[1rem] bg-indigo-100 p-4 text-lg font-semibold text-indigo-700">
          <p>{t("flashcards.memorics_coming_soon")}</p>
        </div>
        <DeckList decks={decks} subjects={subjects} deckCards={deckCards} />
      </div>
    </main>
  );
}
