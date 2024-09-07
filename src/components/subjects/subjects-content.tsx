"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Subject } from "@/types/subjects";
import SubjectList from "./subject-list";

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
        <p className="text-sm text-muted-foreground">
          {t("subjects.add.notice")}
        </p>
        <p className="text-sm text-muted-foreground">
          {t("subjects.add.notice.2")}
        </p>
      </div>
    </main>
  );
}
