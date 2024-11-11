import { getHomeworkForCurrentSchoolYear } from "@/app/actions/homework";
import { getCurrentSchoolYearId } from "@/app/actions/school-year";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import { HomeworkContent } from "@/components/homework/homework-content";

export default async function HomeworkPage() {
  const subjects = await getSubjectsForCurrentSchoolYear();
  const initalHomework = await getHomeworkForCurrentSchoolYear();
  const currentSchoolYearId = await getCurrentSchoolYearId();
  return (
    <HomeworkContent
      initalHomework={initalHomework}
      subjects={subjects}
      schoolYearId={currentSchoolYearId}
    />
  );
}
