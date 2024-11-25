export interface FlashcardDeck {
  id: number;
  name: string;
  description: string;
  subject_id: number;
  school_year_id: number;
}

export interface Flashcard {
  id: number;
  deck_id: number;
  front_text: string;
  back_text: string;
  level: number;
  times_practiced: number;
  last_practiced_at: string | null;
  next_practice_at: string | null;
  created_at: string;
  updated_at: string;
}

export type PracticeMode = "smart" | "practice";

export interface PracticeFlashcard extends Flashcard {
  correctStreak: number;
}

export interface PracticeSessionStats {
  totalCards: number;
  completedCards: number;
  currentStreak: number;
}

export interface NewDeck {
  name: string;
  description: string;
  subject_id: number;
  school_year_id: number;
}
