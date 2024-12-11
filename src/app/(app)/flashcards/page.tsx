import React, { Suspense } from "react";
import PageLoader from "@/components/shared/page-loader";
import { getDecks, getCardsForDeck } from "@/app/actions/flashcards";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import { getCurrentSchoolYearId } from "@/app/actions/school-year";
import { FlashcardsContent } from "@/components/flashcards/flashcards-content";
import { Flashcard } from "@/types/flashcards";
import { createClient } from "@/lib/supabase/server";

export default function FlashcardsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <FlashcardsPageContent />
    </Suspense>
  );
}

async function FlashcardsPageContent() {
  const supabase = createClient();
  const [decks, subjects, schoolYearId] = await Promise.all([
    getDecks(),
    getSubjectsForCurrentSchoolYear(),
    getCurrentSchoolYearId(),
  ]);

  // Get AI credits used
  const { data: creditData } = await supabase
    .from("ai_credits")
    .select("count")
    .eq("school_year_id", schoolYearId)
    .single();

  const aiCreditsUsed = creditData?.count || 0;

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
      schoolYearId={schoolYearId}
      aiCreditsUsed={aiCreditsUsed}
    />
  );
}
