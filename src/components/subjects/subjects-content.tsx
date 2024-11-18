"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Subject } from "@/types/subjects";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubjectList from "./subject-list";
import Link from "next/link";
interface SubjectsContentProps {
  subjects: Subject[];
}

export function SubjectsContent({ subjects }: SubjectsContentProps) {
  const { t } = useTranslation();

  if (!subjects || !Array.isArray(subjects)) {
    return <p>No subjects available</p>;
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-10">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">{t("subjects")}</h1>
      </div>

      <SubjectList subjects={subjects} />

      <div className="w-full text-center">
        <Link href="/subjects/new">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            {t("subjects.add")}
          </Button>
        </Link>
      </div>
    </main>
  );
}
