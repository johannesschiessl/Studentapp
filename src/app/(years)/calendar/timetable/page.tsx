import { getTimeTable } from "@/app/actions/school-year";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import TimetableContent from "@/components/timetable/timetable-content";

export default async function TimetablePage() {
  const [timetable, subjects] = await Promise.all([
    getTimeTable(),
    getSubjectsForCurrentSchoolYear(),
  ]);

  return <TimetableContent timetable={timetable} subjects={subjects} />;
}
