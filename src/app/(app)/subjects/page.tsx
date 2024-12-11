import React, { Suspense } from "react";
import PageLoader from "@/components/shared/page-loader";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import { SubjectsContent } from "@/components/subjects/subjects-content";

export default function SubjectsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <SubjectsPageContent />
    </Suspense>
  );
}

async function SubjectsPageContent() {
  const subjects = await getSubjectsForCurrentSchoolYear();

  return <SubjectsContent subjects={subjects} />;
}
