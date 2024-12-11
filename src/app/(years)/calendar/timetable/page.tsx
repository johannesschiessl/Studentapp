import React, { Suspense } from "react";
import PageLoader from "@/components/shared/page-loader";
import { getTimeTable } from "@/app/actions/school-year";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import TimetableContent from "@/components/timetable/timetable-content";
import BackButton from "@/components/shared/back-button";

export default function TimetablePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <TimetablePageContent />
    </Suspense>
  );
}

async function TimetablePageContent() {
  const [timetable, subjects] = await Promise.all([
    getTimeTable(),
    getSubjectsForCurrentSchoolYear(),
  ]);

  return (
    <>
      <BackButton url="/calendar" />
      <TimetableContent timetable={timetable} subjects={subjects} />
    </>
  );
}
