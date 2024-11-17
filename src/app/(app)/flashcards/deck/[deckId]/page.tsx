import { getDeck, getCardsForDeck } from "@/app/actions/flashcards";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import { DeckContent } from "@/components/flashcards/deck-content";
import { notFound } from "next/navigation";

interface DeckPageProps {
  params: {
    deckId: string;
  };
}

export default async function DeckPage({ params }: DeckPageProps) {
  const deckId = parseInt(params.deckId);
  if (isNaN(deckId)) notFound();

  const [deck, cards, subjects] = await Promise.all([
    getDeck(deckId),
    getCardsForDeck(deckId),
    getSubjectsForCurrentSchoolYear(),
  ]);

  if (!deck) notFound();

  const subject = subjects.find((s) => s.id === deck.subject_id);
  if (!subject) notFound();

  return (
    <DeckContent
      initialCards={cards}
      deck={deck}
      subject={subject}
      subjects={subjects}
    />
  );
}
