import { UserRound, MapPin } from "lucide-react";
import Badge from "@/components/shared/badge";
import SubjectIcon from "@/components/shared/subject-icon";
import { getSubject } from "@/app/actions/subjects";

export default async function SubjectPage(params: { params: { id: string } }) {
  const subjectId = params.params.id;
  const subject = await getSubject(parseInt(subjectId));

  return (
    <main className="mx-auto w-full max-w-5xl">
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            {subject && (
              <SubjectIcon
                size="lg"
                icon={subject.icon}
                color={subject.color}
              />
            )}
            <h1 className="text-3xl font-bold">{subject?.name}</h1>
          </div>
        </div>
        {subject && (
          <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
            {subject.teacher && (
              <Badge color={subject.color}>
                <UserRound className="mr-2 h-5 w-5" />
                {subject.teacher}
              </Badge>
            )}

            {subject.room && (
              <Badge color={subject.color}>
                <MapPin className="mr-2 h-5 w-5" />
                {subject.room}
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="mt-4">{/* TODO: Add exams */}</div>
    </main>
  );
}
