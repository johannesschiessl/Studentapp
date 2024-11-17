import { Flashcard } from "@/types/flashcards";

export function needsPractice(card: Flashcard): boolean {
  if (card.level === 0) return true;
  if (!card.next_practice_at) return false;

  const nextPractice = new Date(card.next_practice_at);
  const now = new Date();

  return nextPractice <= now;
}

export function getCardsDuePractice(cards: Flashcard[]): number {
  return cards.filter(needsPractice).length;
}
