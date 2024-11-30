import { Exam, ExamType } from "@/types/exams";
import { Calendar, CalendarArrowDown } from "lucide-react";

import { EditExamDialog } from "./edit-exam-dialog";
import { useTranslation } from "@/hooks/use-translation";

export default function ExamCard({
  exam,
  color,
  onEdit,
  onDelete,
  examTypes,
  gradingSystem,
}: {
  exam: Exam;
  color: string;
  onEdit: (exam: Exam) => void;
  onDelete: (id: number) => void;
  examTypes: ExamType[];
  gradingSystem: string;
}) {
  const { t } = useTranslation();
  return (
    <EditExamDialog
      exam={exam}
      onEdit={(data: Exam) => onEdit(data)}
      onDelete={(id: number) => onDelete(id)}
      examTypes={examTypes}
      gradingSystem={gradingSystem}
    >
      <div
        key={exam.id}
        className="flex w-full cursor-pointer flex-col justify-between rounded-[1rem] border-2 p-4"
      >
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold">
                {
                  examTypes.find(
                    (type) => parseInt(type.id) === exam.exam_type_id,
                  )?.name
                }
              </h2>
            </div>
            {exam.grade !== undefined && (
              <span className={`text-xl font-bold text-${color}-500`}>
                {exam.grade}
                {exam.grade_modifier !== "none" && (
                  <span>{exam.grade_modifier}</span>
                )}
              </span>
            )}
          </div>
          <p className="my-3 text-sm text-gray-600">
            {exam.description ? exam.description : t("exams.no_description")}
          </p>
        </div>

        <div className="flex-grow" />

        <div className="mt-4 flex w-full flex-col space-y-2">
          <span
            className={`flex items-center text-sm font-medium text-muted-foreground`}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {t("exams.written_on")}{" "}
            {new Date(exam.date_written).toLocaleDateString()}
          </span>
          {exam.date_returned && (
            <span
              className={`flex items-center text-sm font-medium text-muted-foreground`}
            >
              <CalendarArrowDown className="mr-2 h-4 w-4" />
              {t("exams.returned_on")}{" "}
              {new Date(exam.date_returned).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </EditExamDialog>
  );
}
