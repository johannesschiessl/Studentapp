import { Subject } from "@/types/subjects";
import SubjectCard from "./subject-card";

export default function SubjectList({ subjects }: { subjects: Subject[] }) {
  return (
    <div className="mt-8 w-full gap-4 space-y-4 md:grid md:grid-cols-3 md:space-y-0">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
