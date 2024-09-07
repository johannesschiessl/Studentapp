import { Subject } from "@/types/subjects";
import Link from "next/link";
import Badge from "../shared/badge";
import { MapPin, UserRound } from "lucide-react";
import SubjectIcon from "../shared/subject-icon";

export default function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Link
      href={`/subjects/${subject.id}`}
      key={subject.id}
      className="flex h-full w-full cursor-pointer flex-col rounded-[1rem] border-2 p-4 text-left"
    >
      <div className="mb-5 flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <SubjectIcon icon={subject.icon} color={subject.color} />
          <p className={`text-xl font-semibold`}>{subject.name}</p>
        </div>
      </div>
      <div className="mt-4 flex w-full flex-col items-start space-y-2">
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
    </Link>
  );
}
