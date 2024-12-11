import { Suspense } from "react";
import PageLoader from "@/components/shared/page-loader";
import { getHomeworkForCurrentSchoolYear } from "@/app/actions/homework";
import { getCurrentSchoolYearId } from "@/app/actions/school-year";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import { HomeworkContent } from "@/components/homework/homework-content";

export default function HomeworkPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <HomeworkPageContent />
    </Suspense>
  );
}

async function HomeworkPageContent() {
  const [subjects, initalHomework, currentSchoolYearId] = await Promise.all([
    getSubjectsForCurrentSchoolYear(),
    getHomeworkForCurrentSchoolYear(),
    getCurrentSchoolYearId(),
  ]);

  return (
    <HomeworkContent
      initalHomework={initalHomework}
      subjects={subjects}
      schoolYearId={currentSchoolYearId}
    />
  );
}
