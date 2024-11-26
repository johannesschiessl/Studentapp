"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { generateDeckFromImage } from "@/app/actions/flashcards";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { FlashcardDeck } from "@/types/flashcards";
import { useTranslation } from "@/hooks/use-translation";

interface AddCardsFromImageDialogProps {
  deck: FlashcardDeck;
  onCardsGenerated: () => void;
  children: React.ReactNode;
}

export function AddCardsFromImageDialog({
  deck,
  onCardsGenerated,
  children,
}: AddCardsFromImageDialogProps) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [instructions, setInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const { t } = useTranslation();

  const loadingMessages = useMemo(
    () => [
      t("flashcards.collecting_images"),
      t("flashcards.analyzing_content"),
      t("flashcards.creating_cards"),
      t("flashcards.processing_text"),
      t("flashcards.almost_there"),
    ],
    [t],
  );

  useEffect(() => {
    if (!isLoading) return;

    const messageInterval = setInterval(() => {
      setShowMessage(false);
      setTimeout(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        setShowMessage(true);
      }, 500);
    }, 3000);

    return () => clearInterval(messageInterval);
  }, [isLoading, loadingMessages.length]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessageIndex(0);
    setShowMessage(true);

    try {
      const imageBase64s = await Promise.all(
        images.map((image) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(image);
          });
        }),
      );

      const updatedDeck = await generateDeckFromImage(
        imageBase64s,
        instructions,
        deck,
      );
      setOpen(false);
      onCardsGenerated();
      toast.success(t("flashcards.cards_generated_successfully"));
      console.log("updated deck", updatedDeck);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : t("flashcards.card_generation_error"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{t("flashcards.generate_from_image")}</DialogTitle>
          <DialogDescription>
            {t("flashcards.generate_from_image_description")}
          </DialogDescription>
        </DialogHeader>

        <Alert variant="warning" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {t("flashcards.generate_from_image_warning")}
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                {t("flashcards.upload_images")}
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-secondary-foreground hover:file:bg-secondary/80"
              />
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {images.map((image, i) => (
                  <div key={i} className="relative aspect-video">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${i + 1}`}
                      fill
                      className="rounded-md object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                {t("flashcards.layout_instructions")} (Optional)
              </label>
              <Textarea
                placeholder={t("flashcards.layout_instructions_placeholder")}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={images.length === 0 || isLoading}
                className="min-w-[140px] justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span
                      className={cn(
                        "transition-opacity duration-500",
                        showMessage ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {loadingMessages[loadingMessageIndex]}
                      <span className="animate-pulse">...</span>
                    </span>
                  </span>
                ) : (
                  t("flashcards.generate_cards")
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
