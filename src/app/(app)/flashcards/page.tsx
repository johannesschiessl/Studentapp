import { getDecks, getCardsForDeck } from "@/app/actions/flashcards";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import { FlashcardsContent } from "@/components/flashcards/flashcards-content";
import { Flashcard } from "@/types/flashcards";

export default async function FlashcardsPage() {
  const [decks, subjects] = await Promise.all([
    getDecks(),
    getSubjectsForCurrentSchoolYear(),
  ]);

  const deckCards: Record<number, Flashcard[]> = {};
  await Promise.all(
    decks.map(async (deck) => {
      deckCards[deck.id] = await getCardsForDeck(deck.id);
    }),
  );

  return (
    <FlashcardsContent
      initialDecks={decks}
      subjects={subjects}
      deckCards={deckCards}
    />
  );
}
