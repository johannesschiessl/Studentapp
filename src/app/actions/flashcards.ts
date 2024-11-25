"use server";

import { createClient } from "@/lib/supabase/server";
import { Flashcard, FlashcardDeck } from "@/types/flashcards";
import { revalidatePath } from "next/cache";
import { getCurrentSchoolYearId } from "@/app/actions/school-year";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import {
  validateStringLength,
  STRING_LIMITS,
} from "@/lib/validation/string-limits";
import {
  RESOURCE_LIMITS,
  checkResourceLimit,
  ResourceLimitError,
} from "@/lib/validation/resource-limits";
import OpenAI from "openai";
import { Subject } from "@/types/subjects";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI();

// Add these types for the Vision API
type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "low" | "high" | "auto";
  };
} & { refusal?: never };

type TextContent = {
  type: "text";
  text: string;
} & { refusal?: never };

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
  validateStringLength(card.front_text, STRING_LIMITS.LONG_TEXT);
  validateStringLength(card.back_text, STRING_LIMITS.LONG_TEXT);

  const supabase = createClient();

  // Check cards per deck limit
  await checkResourceLimit(
    supabase,
    "flashcards",
    "id",
    { deck_id: card.deck_id },
    RESOURCE_LIMITS.CARDS_PER_DECK,
    "You have reached the maximum limit of cards (500) for this deck",
  );

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
  validateStringLength(card.front_text, STRING_LIMITS.LONG_TEXT);
  validateStringLength(card.back_text, STRING_LIMITS.LONG_TEXT);

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
  validateStringLength(deck.name);
  if (deck.description) {
    validateStringLength(deck.description, STRING_LIMITS.LONG_TEXT);
  }

  const supabase = createClient();
  const schoolYearId = await getCurrentSchoolYearId();

  // Check deck limit
  await checkResourceLimit(
    supabase,
    "flashcard_decks",
    "id",
    { school_year_id: schoolYearId },
    RESOURCE_LIMITS.DECKS_PER_SCHOOL_YEAR,
    "You have reached the maximum limit of flashcard decks (200) for this school year",
  );

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

const AIGeneratedCard = z.object({
  front_text: z.string(),
  back_text: z.string(),
});

const AIGeneratedDeck = z.object({
  name: z.string(),
  description: z.string(),
  subject_id: z.number(),
  cards: z.array(AIGeneratedCard),
});

async function convertToBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return `data:${response.headers.get("content-type") || "image/jpeg"};base64,${base64}`;
}

async function checkAICreditLimit(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  schoolYearId: number,
): Promise<number> {
  // Get current credit count
  const { data: creditData, error: creditError } = await supabase
    .from("ai_credits")
    .select("count")
    .eq("school_year_id", schoolYearId)
    .eq("user_id", userId)
    .single();

  const currentCount = creditData?.count || 0;

  if (creditError) throw creditError;

  if (currentCount >= RESOURCE_LIMITS.AI_CREDITS_PER_SCHOOL_YEAR) {
    throw new ResourceLimitError(
      `You have reached the maximum limit of AI-generated decks (${RESOURCE_LIMITS.AI_CREDITS_PER_SCHOOL_YEAR}) for this school year`,
    );
  }

  return currentCount;
}

async function incrementAICreditCount(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  schoolYearId: number,
  currentCount: number,
): Promise<void> {
  const { error: upsertError } = await supabase.from("ai_credits").upsert(
    {
      user_id: userId,
      school_year_id: schoolYearId,
      count: currentCount + 1,
    },
    { onConflict: "user_id,school_year_id" },
  );

  if (upsertError) {
    console.error("Failed to update AI credit usage:", upsertError);
  }
}

export async function generateDeckFromImage(
  images: string[],
  instructions?: string,
  existingDeck?: FlashcardDeck,
): Promise<FlashcardDeck> {
  const supabase = createClient();
  const schoolYearId = await getCurrentSchoolYearId();
  const subjects = await getSubjectsForCurrentSchoolYear();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Always check the limit first
  const currentCount = await checkAICreditLimit(supabase, userId, schoolYearId);

  // Modify system message based on whether we're adding to existing deck
  const systemMessage = existingDeck
    ? `You are an AI assistant that helps create flashcards from images. Create flashcards that match the style and content of the existing deck "${existingDeck.name}". Keep the language consistent with the existing deck.`
    : `You are an AI assistant that helps create flashcard decks from images. Analyze the image(s) and create appropriate flashcards. Choose the most suitable subject from this list:

${subjects.map((s: Subject) => `- ${s.name} (ID: ${s.id})`).join("\n")}`;

  // Convert images to base64
  const base64Images = await Promise.all(images.map(convertToBase64));

  const imageContent = base64Images.map((image) => ({
    type: "image_url",
    image_url: {
      url: image,
      detail: "high",
    },
  }));

  // Call OpenAI API with Structured Outputs
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      { role: "system", content: systemMessage },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: instructions || "Please create flashcards from these images.",
          } as TextContent,
          ...imageContent.map((content) => content as ImageContent),
        ],
      },
    ],
    response_format: zodResponseFormat(AIGeneratedDeck, "ai_generated_deck"),
  });

  const result = completion.choices[0].message;

  // Handle potential refusal
  if (result.refusal) {
    throw new Error(`AI refused to generate deck: ${result.refusal}`);
  }

  const aiGeneratedDeck = result.parsed;
  if (!aiGeneratedDeck) {
    throw new Error("Failed to generate deck: No valid response from AI");
  }

  let resultDeck: FlashcardDeck;

  if (existingDeck) {
    // Only create cards for existing deck
    await Promise.all(
      aiGeneratedDeck.cards.map((card: z.infer<typeof AIGeneratedCard>) =>
        addCard({
          deck_id: existingDeck.id,
          front_text: card.front_text,
          back_text: card.back_text,
          level: 0,
          times_practiced: 0,
          last_practiced_at: null,
          next_practice_at: null,
        }),
      ),
    );
    resultDeck = existingDeck;
  } else {
    // Create new deck and cards
    const newDeck = await createDeck({
      name: aiGeneratedDeck.name,
      description: aiGeneratedDeck.description,
      subject_id: aiGeneratedDeck.subject_id,
      school_year_id: schoolYearId,
    });

    // Create cards
    await Promise.all(
      aiGeneratedDeck.cards.map((card: z.infer<typeof AIGeneratedCard>) =>
        addCard({
          deck_id: newDeck.id,
          front_text: card.front_text,
          back_text: card.back_text,
          level: 0,
          times_practiced: 0,
          last_practiced_at: null,
          next_practice_at: null,
        }),
      ),
    );
    resultDeck = newDeck;
  }

  // Increment the counter after successful generation
  await incrementAICreditCount(supabase, userId, schoolYearId, currentCount);
  revalidatePath(`/flashcards/deck/${resultDeck.id}`);
  return resultDeck;
}
