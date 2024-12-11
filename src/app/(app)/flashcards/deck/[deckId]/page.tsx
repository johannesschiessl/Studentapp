import React, { Suspense } from "react";
import PageLoader from "@/components/shared/page-loader";
import { getDeck, getCardsForDeck } from "@/app/actions/flashcards";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import {
  getCurrentSchoolYearId,
  getSchoolYear,
} from "@/app/actions/school-year";
import { DeckContent } from "@/components/flashcards/deck-content";
import { notFound } from "next/navigation";
import { Subject } from "@/types/subjects";

interface DeckPageProps {
  params: {
    deckId: string;
  };
}

export default function DeckPage({ params }: DeckPageProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      <DeckPageContent params={params} />
    </Suspense>
  );
}

async function DeckPageContent({ params }: DeckPageProps) {
  const deckId = parseInt(params.deckId);
  if (isNaN(deckId)) notFound();

  const [deck, cards, subjects, schoolYear] = await Promise.all([
    getDeck(deckId),
    getCardsForDeck(deckId),
    getSubjectsForCurrentSchoolYear(),
    getSchoolYear(await getCurrentSchoolYearId()),
  ]);

  if (!deck) notFound();

  const subject = subjects.find((s: Subject) => s.id === deck.subject_id);
  if (!subject) notFound();

  return (
    <DeckContent
      initialCards={cards}
      deck={deck}
      subject={subject}
      subjects={subjects}
      settings={schoolYear.settings}
    />
  );
}
