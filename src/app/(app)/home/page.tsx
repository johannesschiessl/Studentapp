import Greeting from "@/components/home/greeting";
import QuoteCard from "@/components/home/quote-card";
import TimetableCard from "@/components/home/timetable-card";
import UpcomingExamsCard from "@/components/home/upcoming-exams-card";
import GradeStatsCard from "@/components/home/grade-stats-card";
import {
  getTimeTable,
  getCurrentSchoolYearId,
  getSchoolYear,
} from "@/app/actions/school-year";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import { getUpcomingExams } from "@/app/actions/exams";

export default async function HomePage() {
  const [timetable, subjects, upcomingExams] = await Promise.all([
    getTimeTable(),
    getSubjectsForCurrentSchoolYear(),
    getUpcomingExams(),
  ]);

  const schoolYear = await getSchoolYear(await getCurrentSchoolYearId());

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6">
      <Greeting />
      <div className="space-y-6">
        <QuoteCard />
        <TimetableCard timetable={timetable} subjects={subjects} />
        <GradeStatsCard subjects={subjects} settings={schoolYear.settings} />
        <UpcomingExamsCard exams={upcomingExams} subjects={subjects} />
      </div>
    </main>
  );
}
