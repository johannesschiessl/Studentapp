import React from "react";
import { getSubject } from "@/app/actions/subjects";
import SubjectContent from "@/components/subjects/subject-content";
import {
  getExamsForSubject,
  getExamTypesForCurrentSchoolYear,
  getExamTypeGroupsForCurrentSchoolYear,
} from "@/app/actions/exams";
import {
  getSchoolYear,
  getCurrentSchoolYearId,
} from "@/app/actions/school-year";

export default async function SubjectPage({
  params,
}: {
  params: { id: string };
}) {
  const subjectId = params.id;
  const [subject, examTypes, intialExams, examTypeGroups] = await Promise.all([
    getSubject(parseInt(subjectId)),
    getExamTypesForCurrentSchoolYear(),
    getExamsForSubject(parseInt(subjectId)),
    getExamTypeGroupsForCurrentSchoolYear(),
  ]);

  const schoolYear = await getSchoolYear(await getCurrentSchoolYearId());

  return (
    <SubjectContent
      subject={subject}
      intialExams={intialExams}
      examTypes={examTypes}
      examTypeGroups={examTypeGroups}
      settings={schoolYear.settings}
      gradingSystem={schoolYear.grading_system}
    />
  );
}
