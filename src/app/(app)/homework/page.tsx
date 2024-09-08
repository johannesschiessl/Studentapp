import { getHomeworkForCurrentSchoolYear } from "@/app/actions/homework";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import { HomeworkContent } from "@/components/homework/homework-content";

export default async function HomeworkPage() {
  const subjects = await getSubjectsForCurrentSchoolYear();
  const initalHomework = await getHomeworkForCurrentSchoolYear();
  return (
    <HomeworkContent initalHomework={initalHomework} subjects={subjects} />
  );
}
