import React from "react";
import { getSubject } from "@/app/actions/subjects";
import SubjectContent from "@/components/subjects/subject-content";
import {
  getExamsForSubject,
  getExamTypesForCurrentSchoolYear,
} from "@/app/actions/exams";

export default async function SubjectPage({
  params,
}: {
  params: { id: string };
}) {
  const subjectId = params.id;
  const subject = await getSubject(parseInt(subjectId));
  const examTypes = await getExamTypesForCurrentSchoolYear();
  const intialExams = await getExamsForSubject(parseInt(subjectId));

  return (
    <SubjectContent
      subject={subject}
      intialExams={intialExams}
      examTypes={examTypes}
    />
  );
}
