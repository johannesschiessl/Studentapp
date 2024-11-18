import Link from "next/link";
import { X } from "lucide-react";
import { getTimeTable } from "@/app/actions/school-year";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import { TimetableEditor } from "@/components/timetable/timetable-editor";

export default async function TimetablePage() {
  const [timetable, subjects] = await Promise.all([
    getTimeTable(),
    getSubjectsForCurrentSchoolYear(),
  ]);

  return (
    <>
      <Link
        href="/calendar"
        className="fixed right-6 top-6 z-50 rounded-full bg-background p-3 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <X className="h-6 w-6" />
      </Link>

      <div className="relative mx-auto max-w-4xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">Class Schedule</h1>
          <p className="text-muted-foreground">
            Manage your weekly class schedule
          </p>
        </div>

        <TimetableEditor initialTimetable={timetable} subjects={subjects} />
      </div>
    </>
  );
}
