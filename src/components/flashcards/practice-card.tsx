"use client";

import { useState } from "react";
import { PracticeFlashcard } from "@/types/flashcards";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import styles from "@/styles/practice-card.module.css";
import { cn } from "@/lib/utils";
import { XCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PracticeCardProps {
  card: PracticeFlashcard;
  onResult: (known: boolean) => void;
}

export function PracticeCard({ card, onResult }: PracticeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div
        className={styles.cardContainer}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={cn(styles.card, isFlipped && styles.flipped)}>
          <div className={styles.cardFace}>
            <p className="text-lg">{card.front_text}</p>
          </div>
          <div className={cn(styles.cardFace, styles.cardBack)}>
            <div>
              <p className="text-lg">{card.front_text}</p>
            </div>
            <div className={styles.divider} />
            <div>
              <p className={styles.answerText}>{card.back_text}</p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFlipped && (
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                variant="secondary"
                size="lg"
                className="hover:bg-rose-100 hover:text-rose-500 dark:hover:bg-rose-900/20"
                onClick={() => {
                  setIsFlipped(false);
                  onResult(false);
                }}
              >
                <XCircle className="mr-2 h-5 w-5 text-red-500" />
                {t("flashcards.dont_know")}
              </Button>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                size="lg"
                variant="secondary"
                className="hover:bg-green-100 hover:text-green-500 dark:hover:bg-green-900/20"
                onClick={() => {
                  setIsFlipped(false);
                  onResult(true);
                }}
              >
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                {t("flashcards.know")}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
