"use client";

import { Button } from "@/components/ui/button";
import { SkipForward, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/app/actions/onboarding";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ONBOARDING_STEPS = [
  {
    title: "Welcome to Student App",
    description:
      "Let's get you set up to manage your academic life effectively.",
    image: "/onboarding/subjects.png",
  },
  {
    title: "Track Your Subjects",
    description:
      "Add your subjects, grades, and keep everything organized in one place.",
    image: "/onboarding/subjects.png",
  },
  {
    title: "Manage Homework",
    description: "Never miss an assignment with our homework tracking system.",
    image: "/onboarding/homework.png",
  },
  {
    title: "Plan Your Schedule",
    description:
      "Use the calendar to stay on top of your classes and assignments.",
    image: "/onboarding/calendar.png",
  },
  {
    title: "Track Exams",
    description: "Keep track of upcoming exams and your performance.",
    image: "/onboarding/subject.png",
  },
  {
    title: "Study with Flashcards",
    description: "Create and practice with flashcards to ace your exams.",
    image: "/onboarding/practice.png",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();
  const step = ONBOARDING_STEPS[currentStep];

  const handleComplete = async () => {
    await completeOnboarding();
    router.push("/home");
  };

  const handleNext = () => {
    if (currentStep === ONBOARDING_STEPS.length - 1) {
      handleComplete();
    } else {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <>
      <motion.button
        onClick={handleComplete}
        className="fixed right-6 top-6 z-50 rounded-full bg-background p-3 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SkipForward className="h-6 w-6" />
      </motion.button>

      <div className="relative mx-auto max-w-4xl p-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div className="mb-8 pt-8 text-center">
              <motion.h1
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {step.title}
              </motion.h1>
              <motion.p
                className="mt-2 text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {step.description}
              </motion.p>
            </div>

            <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
              <motion.div
                className="relative aspect-video"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          </motion.div>

          <div className="flex gap-2">
            {ONBOARDING_STEPS.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
                initial={false}
                animate={{
                  scale: index === currentStep ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={handleNext} className="flex items-center gap-2">
              {currentStep === ONBOARDING_STEPS.length - 1 ? (
                "Get Started"
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
