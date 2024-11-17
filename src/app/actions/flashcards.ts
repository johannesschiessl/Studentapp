"use server";

import { createClient } from "@/lib/supabase/server";
import { Flashcard, FlashcardDeck } from "@/types/flashcards";
import { revalidatePath } from "next/cache";
import { getCurrentSchoolYearId } from "@/app/actions/school-year";

export async function getDecks() {
  const supabase = createClient();
  const schoolYearId = await getCurrentSchoolYearId();

  const { data: decks, error } = await supabase
    .from("flashcard_decks")
    .select("*")
    .eq("school_year_id", schoolYearId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return decks as FlashcardDeck[];
}

export async function getDeck(id: number) {
  const supabase = createClient();

  const { data: deck, error } = await supabase
    .from("flashcard_decks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return deck as FlashcardDeck;
}

export async function createDeck(deck: Partial<FlashcardDeck>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("flashcard_decks")
    .insert(deck)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/flashcards");
  return data as FlashcardDeck;
}

export async function getCardsForPractice(deckId: number) {
  const supabase = createClient();
  const today = new Date().toISOString();

  const { data: cards, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("deck_id", deckId)
    .or(`level.eq.0,next_practice_at.lte.${today}`);

  if (error) throw error;
  return cards as Flashcard[];
}

export async function updateCardProgress(
  cardId: number,
  known: boolean,
  currentLevel: number,
) {
  const supabase = createClient();

  // First get the current card to get times_practiced
  const { data: currentCard, error: fetchError } = await supabase
    .from("flashcards")
    .select("times_practiced")
    .eq("id", cardId)
    .single();

  if (fetchError) throw fetchError;

  // If not known or hasn't reached 2 correct answers, keep for today's practice
  if (!known) {
    const { data, error } = await supabase
      .from("flashcards")
      .update({
        level: 0,
        times_practiced: (currentCard?.times_practiced || 0) + 1,
        last_practiced_at: new Date().toISOString(),
        next_practice_at: new Date().toISOString(), // Keep for today
      })
      .eq("id", cardId)
      .select()
      .single();

    if (error) throw error;
    return data as Flashcard;
  }

  // Only update level and schedule for tomorrow if card was answered correctly twice
  const newLevel = Math.min(currentLevel + 1, 5);
  const nextPractice = calculateNextPractice(newLevel);

  const { data, error } = await supabase
    .from("flashcards")
    .update({
      level: newLevel,
      times_practiced: (currentCard?.times_practiced || 0) + 1,
      last_practiced_at: new Date().toISOString(),
      next_practice_at: nextPractice.toISOString(),
    })
    .eq("id", cardId)
    .select()
    .single();

  if (error) throw error;
  return data as Flashcard;
}

function calculateNextPractice(level: number): Date {
  const now = new Date();

  switch (level) {
    case 1:
      return new Date(now.setDate(now.getDate() + 1));
    case 2:
      return new Date(now.setDate(now.getDate() + 2));
    case 3:
      return new Date(now.setDate(now.getDate() + 7));
    case 4:
      return new Date(now.setDate(now.getDate() + 14));
    case 5:
      return new Date(now.setDate(now.getDate() + 30));
    default:
      return now;
  }
}

export async function getCardsForDeck(deckId: number) {
  const supabase = createClient();

  const { data: cards, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("deck_id", deckId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return cards as Flashcard[];
}

export async function addCard(
  card: Omit<Flashcard, "id" | "created_at" | "updated_at">,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("flashcards")
    .insert(card)
    .select()
    .single();

  if (error) throw error;
  revalidatePath(`/flashcards/deck/${card.deck_id}`);
  return data as Flashcard;
}

export async function editCard(card: Flashcard) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("flashcards")
    .update(card)
    .eq("id", card.id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath(`/flashcards/deck/${card.deck_id}`);
  return data as Flashcard;
}

export async function deleteCard(id: number, deckId: number) {
  const supabase = createClient();

  const { error } = await supabase.from("flashcards").delete().eq("id", id);

  if (error) throw error;
  revalidatePath(`/flashcards/deck/${deckId}`);
}

export async function addDeck(
  deck: Omit<FlashcardDeck, "id" | "created_at" | "updated_at">,
) {
  const supabase = createClient();
  const schoolYearId = await getCurrentSchoolYearId();

  const { data, error } = await supabase
    .from("flashcard_decks")
    .insert({
      ...deck,
      school_year_id: schoolYearId,
    })
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/flashcards");
  return data as FlashcardDeck;
}

export async function editDeck(deck: FlashcardDeck) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("flashcard_decks")
    .update(deck)
    .eq("id", deck.id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/flashcards");
  revalidatePath(`/flashcards/deck/${deck.id}`);
  return data as FlashcardDeck;
}

export async function deleteDeck(id: number) {
  const supabase = createClient();

  // First delete all cards in the deck
  await supabase.from("flashcards").delete().eq("deck_id", id);

  // Then delete the deck
  const { error } = await supabase
    .from("flashcard_decks")
    .delete()
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/flashcards");
}
