"use client";

import { Subject } from "@/types/subjects";
import { TimeTable } from "@/types/school-year";
import { TimetableEditor } from "./timetable-editor";
import { useTranslation } from "@/hooks/use-translation";

interface TimetableContentProps {
  timetable: TimeTable;
  subjects: Subject[];
}

export default function TimetableContent({
  timetable,
  subjects,
}: TimetableContentProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-8 pt-8 text-center">
        <h1 className="text-3xl font-bold">{t("timetable.title")}</h1>
      </div>

      <TimetableEditor initialTimetable={timetable} subjects={subjects} />
    </>
  );
}
