import React from "react";
import { getSubject } from "@/app/actions/subjects";
import SubjectContent from "@/components/subjects/subject-content";
import {
  getExamsForSubject,
  getExamTypesForCurrentSchoolYear,
  getExamTypeGroupsForCurrentSchoolYear,
} from "@/app/actions/exams";

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

  return (
    <SubjectContent
      subject={subject}
      intialExams={intialExams}
      examTypes={examTypes}
      examTypeGroups={examTypeGroups}
    />
  );
}
