import { Exam, ExamType } from "@/types/exams";
import ExamCard from "./exam-card";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useTranslation } from "@/hooks/use-translation";

export default function ExamList({
  exams,
  color,
  onEdit,
  onDelete,
  examTypes,
  gradingSystem,
}: {
  exams: Exam[];
  color: string;
  onEdit: (exam: Exam) => void;
  onDelete: (id: number) => void;
  examTypes: ExamType[];
  gradingSystem: string;
}) {
  const upcomingExamListParent = useRef(null);
  const pendingExamListParent = useRef(null);
  const writtenExamListParent = useRef(null);
  const examListParent = useRef(null);

  useEffect(() => {
    upcomingExamListParent.current &&
      autoAnimate(upcomingExamListParent.current);
    pendingExamListParent.current && autoAnimate(pendingExamListParent.current);
    writtenExamListParent.current && autoAnimate(writtenExamListParent.current);
    examListParent.current && autoAnimate(examListParent.current);
  }, [
    upcomingExamListParent,
    pendingExamListParent,
    writtenExamListParent,
    examListParent,
  ]);

  const { t } = useTranslation();

  const sortedExams = exams.sort(
    (a, b) =>
      new Date(b.date_written).getTime() - new Date(a.date_written).getTime(),
  );

  const today = new Date();

  const upcomingExams = sortedExams.filter(
    (exam) => new Date(exam.date_written) > today,
  );
  const pendingExams = sortedExams.filter(
    (exam) => new Date(exam.date_written) <= today && !exam.grade,
  );
  const writtenExams = sortedExams.filter(
    (exam) => new Date(exam.date_written) <= today && exam.grade,
  );

  return (
    <div ref={examListParent} className="space-y-4">
      {/* Upcoming Exams */}
      {upcomingExams.length > 0 && (
        <div>
          <h2 className="mb-2 text-lg font-bold">{t("exams.upcoming")}</h2>
          <div
            ref={upcomingExamListParent}
            className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0"
          >
            {upcomingExams.map((exam) => (
              <ExamCard
                examTypes={examTypes}
                onEdit={(exam) => onEdit(exam)}
                onDelete={(id) => onDelete(id)}
                key={exam.id}
                exam={exam}
                color={color}
                gradingSystem={gradingSystem}
              />
            ))}
          </div>
        </div>
      )}

      {/* Pending Exams */}
      {pendingExams.length > 0 && (
        <div>
          <h2 className="mb-2 text-lg font-bold">{t("exams.pending")}</h2>
          <div
            ref={pendingExamListParent}
            className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0"
          >
            {pendingExams.map((exam) => (
              <ExamCard
                examTypes={examTypes}
                onEdit={(exam) => onEdit(exam)}
                onDelete={(id) => onDelete(id)}
                key={exam.id}
                exam={exam}
                color={color}
                gradingSystem={gradingSystem}
              />
            ))}
          </div>
        </div>
      )}

      {/* Written Exams */}
      {writtenExams.length > 0 && (
        <div>
          <h2 className="mb-2 text-lg font-bold">{t("exams.written")}</h2>
          <div
            ref={writtenExamListParent}
            className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0"
          >
            {writtenExams.map((exam) => (
              <ExamCard
                examTypes={examTypes}
                onEdit={(exam) => onEdit(exam)}
                onDelete={(id) => onDelete(id)}
                key={exam.id}
                exam={exam}
                color={color}
                gradingSystem={gradingSystem}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Exams */}
      {upcomingExams.length === 0 &&
        pendingExams.length === 0 &&
        writtenExams.length === 0 && (
          <div className="py-10">
            <p className="text-center text-gray-500">{t("exams.no_exams")}</p>
          </div>
        )}
    </div>
  );
}
