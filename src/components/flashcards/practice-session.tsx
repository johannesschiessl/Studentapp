"use client";

import { useState, useCallback } from "react";
import { Flashcard, PracticeFlashcard, PracticeMode } from "@/types/flashcards";
import { PracticeCard } from "./practice-card";
import { Button } from "@/components/ui/button";
import { updateCardProgress } from "@/app/actions/flashcards";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/use-translation";
import confetti from "canvas-confetti";

interface PracticeSessionProps {
  title: string;
  initialCards: Flashcard[];
  mode: PracticeMode;
}

export function PracticeSession({
  title,
  initialCards,
  mode,
}: PracticeSessionProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [cards, setCards] = useState<PracticeFlashcard[]>(() =>
    initialCards.map((card) => ({ ...card, correctStreak: 0 })),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<number[]>([]);

  const handleResult = useCallback(
    async (known: boolean) => {
      setCards((prev) => {
        const updated = [...prev];
        const card = updated[currentIndex];

        if (known) {
          card.correctStreak = (card.correctStreak || 0) + 1;

          if (card.correctStreak >= 2) {
            setCompletedCards((prev) => [...prev, card.id]);

            if (mode === "smart") {
              updateCardProgress(card.id, true, card.level);
            }

            updated.splice(currentIndex, 1);
          } else {
            const cardToMove = { ...card };
            updated.splice(currentIndex, 1);
            updated.push(cardToMove);
          }
        } else {
          card.correctStreak = 0;

          if (mode === "smart") {
            card.level = 0;
            updateCardProgress(card.id, false, card.level);
          }

          const cardToMove = { ...card };
          updated.splice(currentIndex, 1);
          updated.push(cardToMove);
        }

        return updated;
      });

      if (cards.length > 1) {
        setCurrentIndex((i) => (i >= cards.length - 1 ? 0 : i));
      } else {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    },
    [currentIndex, cards, mode],
  );

  if (cards.length === 0) {
    return (
      <div className="text-center">
        <h2 className="mb-4 text-xl font-semibold">
          {t("flashcards.practice_complete")}
        </h2>
        <p className="mb-6 text-muted-foreground">
          {mode === "practice"
            ? t("flashcards.practice_mode_complete") +
              completedCards.length +
              t("flashcards.practice_mode_complete.suffix")
            : t("flashcards.smart_mode_complete") +
              completedCards.length +
              t("flashcards.smart_mode_complete.suffix")}
        </p>
        <Button onClick={() => router.back()}>
          {t("flashcards.return_to_deck")}
        </Button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  if (!currentCard) return null;

  return (
    <div>
      <div className="mb-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>{title}</span>
          <div>
            {mode === "practice"
              ? t("flashcards.practice_mode")
              : t("flashcards.smart_mode")}
          </div>
        </div>
        <div>
          {t("flashcards.cards_remaining.prefix") +
            (currentIndex + 1) +
            " of " +
            cards.length +
            t("flashcards.cards_remaining.suffix")}
        </div>
        <div className="mt-1">
          {t("flashcards.cards_completed")}: {completedCards.length}
          {currentCard.correctStreak > 0 && (
            <span className="ml-2">
              ({t("flashcards.current_streak")}: {currentCard.correctStreak})
            </span>
          )}
        </div>
      </div>

      <PracticeCard card={currentCard} onResult={handleResult} />
    </div>
  );
}
