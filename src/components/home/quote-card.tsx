"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import { useTranslation } from "@/hooks/use-translation";

const MOTIVATIONAL_QUOTES = [
  {
    quote:
      "We're here to put a dent in the universe. Otherwise why else even be here?",
    author: "Steve Jobs",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote:
      "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
  {
    quote:
      "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    quote:
      "Learning is not attained by chance, it must be sought for with ardor and diligence.",
    author: "Abigail Adams",
  },
  {
    quote:
      "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
  },
  {
    quote:
      "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "Education is not preparation for life; education is life itself.",
    author: "John Dewey",
  },
  {
    quote: "The mind is not a vessel to be filled but a fire to be ignited.",
    author: "Plutarch",
  },
  {
    quote: "Intelligence plus character—that is the goal of true education.",
    author: "Martin Luther King Jr.",
  },
  {
    quote:
      "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    author: "Brian Herbert",
  },
  {
    quote:
      "Education is not the filling of a pail, but the lighting of a fire.",
    author: "W.B. Yeats",
  },
  {
    quote:
      "Knowledge is power. Information is liberating. Education is the premise of progress.",
    author: "Kofi Annan",
  },
  {
    quote:
      "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    quote:
      "Everything you've ever wanted is sitting on the other side of fear.",
    author: "George Addair",
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    quote:
      "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    quote: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    quote:
      "Everything is either an opportunity to grow or an obstacle to keep you from growing. You get to choose.",
    author: "Wayne Dyer",
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    quote: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
  },
  {
    quote:
      "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
  },
  {
    quote: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
  },
  {
    quote: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
  },
  {
    quote: "What we think, we become.",
    author: "Buddha",
  },
  {
    quote:
      "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
    author: "Bil Keane",
  },
  {
    quote: "The best revenge is massive success.",
    author: "Frank Sinatra",
  },
  {
    quote: "The harder I work, the luckier I get.",
    author: "Samuel Goldwyn",
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    quote: "Champions keep playing until they get it right.",
    author: "Billie Jean King",
  },
  {
    quote:
      "The difference between ordinary and extraordinary is that little extra.",
    author: "Jimmy Johnson",
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
  },
  {
    quote: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford",
  },
  {
    quote:
      "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    quote: "If you can dream it, you can do it.",
    author: "Walt Disney",
  },
  {
    quote: "Quality is not an act, it is a habit.",
    author: "Aristotle",
  },
  {
    quote: "Change your thoughts and you change your world.",
    author: "Norman Vincent Peale",
  },
  {
    quote: "There is no substitute for hard work.",
    author: "Thomas Edison",
  },
  {
    quote: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
  },
  {
    quote: "Action is the foundational key to all success.",
    author: "Pablo Picasso",
  },
  {
    quote: "Genius is 1% inspiration and 99% perspiration.",
    author: "Thomas Edison",
  },
];

export default function QuoteCard() {
  const quote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    return MOTIVATIONAL_QUOTES[randomIndex];
  }, []);

  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("home.quote.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="italic text-muted-foreground">
          &quot;{quote.quote}&quot;
        </p>
        <p className="mt-2 text-sm text-muted-foreground">- {quote.author}</p>
      </CardContent>
    </Card>
  );
}
