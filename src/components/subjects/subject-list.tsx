"use client";

import { Subject } from "@/types/subjects";
import SubjectCard from "./subject-card";
import { useTranslation } from "@/hooks/use-translation";

export default function SubjectList({ subjects }: { subjects: Subject[] }) {
  const { t } = useTranslation();

  return (
    <div className="mt-8 w-full gap-4 space-y-4 md:grid md:grid-cols-3 md:space-y-0">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}

      {subjects.length === 0 && (
        <div className="col-span-3 flex justify-center">
          <p className="text-sm text-muted-foreground">
            {t("subjects.no_subjects_yet")}
          </p>
        </div>
      )}
    </div>
  );
}
