import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import Greeting from "@/components/home/greeting";
import { SubjectsContent } from "@/components/subjects/subjects-content";

export default async function HomePage() {
  const subjects = await getSubjectsForCurrentSchoolYear();

  return (
    <main className="mx-auto w-full max-w-5xl space-y-10">
      <Greeting />
      <SubjectsContent subjects={subjects} />
    </main>
  );
}
