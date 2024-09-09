import {
  getExamTypeGroupsForCurrentSchoolYear,
  getExamTypesForCurrentSchoolYear,
} from "@/app/actions/exams";
import ExamSettingsContent from "@/components/settings/exams/exam-settings-content";

export default async function ExamSettingsPage() {
  const initialExamTypeGroups = await getExamTypeGroupsForCurrentSchoolYear();

  const initialExamTypes = await getExamTypesForCurrentSchoolYear();
  return (
    <ExamSettingsContent
      initialExamTypeGroups={initialExamTypeGroups}
      initialExamTypes={initialExamTypes}
    />
  );
}
