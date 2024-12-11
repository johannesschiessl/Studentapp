import React, { Suspense } from "react";
import PageLoader from "@/components/shared/page-loader";
import { getDeck, getCardsForPractice } from "@/app/actions/flashcards";
import { PracticeSession } from "@/components/flashcards/practice-session";
import { PracticeMode } from "@/types/flashcards";

interface PracticePageProps {
  params: {
    deckId: string;
  };
  searchParams: { mode?: string };
}

export default function PracticePage(props: PracticePageProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      <PracticePageContent {...props} />
    </Suspense>
  );
}

async function PracticePageContent({
  params,
  searchParams,
}: PracticePageProps) {
  const deckId = parseInt(params.deckId);
  const mode = (
    searchParams.mode === "practice" ? "practice" : "smart"
  ) as PracticeMode;

  const [deck, cards] = await Promise.all([
    getDeck(deckId),
    getCardsForPractice(deckId),
  ]);

  if (!deck)
    return (
      <div className="container py-6">
        <h1 className="mb-2 text-3xl font-bold">Deck not found</h1>
      </div>
    );

  return (
    <main className="mx-auto w-full max-w-5xl space-y-5">
      <PracticeSession title={deck.name} initialCards={cards} mode={mode} />
    </main>
  );
}
