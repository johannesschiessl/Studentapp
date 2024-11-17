"use client";

import { useState } from "react";
import { Flashcard, FlashcardDeck } from "@/types/flashcards";
import { Subject } from "@/types/subjects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import {
  Brain,
  ListChecks,
  Plus,
  Pencil,
  Trash2,
  Star,
  CircleDot,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useRouter } from "next/navigation";
import { CardList } from "./card-list";
import { AddCardDialog } from "./add-card-dialog";
import { EditDeckDialog } from "./edit-deck-dialog";
import {
  addCard,
  deleteCard,
  editCard,
  deleteDeck,
  editDeck,
} from "@/app/actions/flashcards";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SubjectIcon from "@/components/shared/subject-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCardsDuePractice } from "@/lib/flashcards";

interface DeckContentProps {
  deck: FlashcardDeck;
  subject: Subject;
  subjects: Subject[];
  initialCards: Flashcard[];
}

const LEVEL_LABELS = {
  0: "New",
  1: "Level 1",
  2: "Level 2",
  3: "Level 3",
  4: "Level 4",
  5: "Level 5",
};

export function DeckContent({
  deck,
  subject,
  subjects,
  initialCards,
}: DeckContentProps) {
  const [cards, setCards] = useState<Flashcard[]>(initialCards);
  const router = useRouter();
  const { t } = useTranslation();

  // Prepare chart data
  const levelCounts = cards.reduce(
    (acc, card) => {
      acc[card.level] = (acc[card.level] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  const chartData = Array.from({ length: 6 }, (_, i) => ({
    level: LEVEL_LABELS[i as keyof typeof LEVEL_LABELS],
    count: levelCounts[i] || 0,
  }));

  const chartConfig = {
    count: {
      label: "Cards per Level",
      color: "hsl(var(--chart-1))",
    },
  };

  // Filter cards by level
  const cardsByLevel = {
    all: cards,
    new: cards.filter((card) => card.level === 0),
    level1: cards.filter((card) => card.level === 1),
    level2: cards.filter((card) => card.level === 2),
    level3: cards.filter((card) => card.level === 3),
    level4: cards.filter((card) => card.level === 4),
    level5: cards.filter((card) => card.level === 5),
  };

  const cardsDue = getCardsDuePractice(cards);

  async function handleAddCard(
    card: Omit<Flashcard, "id" | "created_at" | "updated_at">,
  ) {
    try {
      const newCard = await addCard(card);
      if (newCard) {
        setCards((prev) => [newCard, ...prev]);
      }
    } catch (error) {
      console.error("Failed to add card:", error);
    }
  }

  function handleEditCard(card: Flashcard) {
    editCard(card);
    setCards((prev) => prev.map((c) => (c.id === card.id ? card : c)));
  }

  function handleDeleteCard(id: number) {
    deleteCard(id, deck.id);
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  async function handleEditDeck(updatedDeck: FlashcardDeck) {
    try {
      await editDeck(updatedDeck);
      router.refresh();
    } catch (error) {
      console.error("Failed to edit deck:", error);
    }
  }

  async function handleDeleteDeck() {
    try {
      await deleteDeck(deck.id);
      router.push("/flashcards");
    } catch (error) {
      console.error("Failed to delete deck:", error);
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <SubjectIcon icon={subject.icon} color={subject.color} size="lg" />
          <div>
            <h1 className="text-2xl font-bold">{deck.name}</h1>
            {deck.description && (
              <p className="text-muted-foreground">{deck.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <EditDeckDialog
              deck={deck}
              subjects={subjects}
              onEdit={handleEditDeck}
            >
              <Button size="icon" variant="ghost">
                <Pencil className="h-4 w-4" />
              </Button>
            </EditDeckDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {t("flashcards.delete_deck")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("flashcards.delete_deck_confirm")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteDeck}>
                    {t("common.delete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex gap-2">
          <AddCardDialog deck={deck} onAdd={handleAddCard}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("flashcards.add_card")}
            </Button>
          </AddCardDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Brain className="mr-2 h-4 w-4" />
                {t("flashcards.practice")}
                {cardsDue > 0 && (
                  <span className="ml-2 rounded-full bg-primary-foreground px-2 py-0.5 text-xs text-primary">
                    {cardsDue}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/flashcards/deck/${deck.id}/practice?mode=smart`)
                }
              >
                <Brain className="mr-2 h-4 w-4" />
                {t("flashcards.smart_practice")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/flashcards/deck/${deck.id}/practice?mode=practice`,
                  )
                }
              >
                <ListChecks className="mr-2 h-4 w-4" />
                {t("flashcards.simple_practice")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Statistics</h2>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="level"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>

      <Tabs defaultValue="all" className="mx-auto mt-4">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex w-full items-center">
            <ListChecks className="mr-2 h-4 w-4" />
            All ({cardsByLevel.all.length})
          </TabsTrigger>
          <TabsTrigger value="new" className="flex w-full items-center">
            <CircleDot className="mr-2 h-4 w-4" />
            New ({cardsByLevel.new.length})
          </TabsTrigger>
          {[1, 2, 3, 4, 5].map((level) => (
            <TabsTrigger
              key={level}
              value={`level${level}`}
              className="flex w-full items-center"
            >
              <Star className="mr-2 h-4 w-4" />
              {level} (
              {
                cardsByLevel[`level${level}` as keyof typeof cardsByLevel]
                  .length
              }
              )
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-5">
          <CardList
            cards={cardsByLevel.all}
            onEdit={handleEditCard}
            onDelete={handleDeleteCard}
          />
        </TabsContent>

        <TabsContent value="new" className="mt-5">
          <CardList
            cards={cardsByLevel.new}
            onEdit={handleEditCard}
            onDelete={handleDeleteCard}
          />
        </TabsContent>

        {[1, 2, 3, 4, 5].map((level) => (
          <TabsContent key={level} value={`level${level}`} className="mt-5">
            <CardList
              cards={cardsByLevel[`level${level}` as keyof typeof cardsByLevel]}
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
            />
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
