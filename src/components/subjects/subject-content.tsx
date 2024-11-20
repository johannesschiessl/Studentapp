"use client";

import { UserRound, MapPin, Plus } from "lucide-react";
import Badge from "@/components/shared/badge";
import SubjectIcon from "@/components/shared/subject-icon";
import { Button } from "@/components/ui/button";
import { Subject } from "@/types/subjects";
import ExamList from "../exams/exam-list";
import { Exam, ExamType, NewExam } from "@/types/exams";
import { AddExamDialog } from "../exams/add-exam-dialog";
import { useState, useMemo } from "react";
import { addExam, deleteExam, editExam } from "@/app/actions/exams";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/use-translation";
import { calculateAverageGrade } from "@/lib/grades";
import { ExamTypeGroup } from "@/types/exams";

export default function SubjectContent({
  subject,
  intialExams,
  examTypes,
  examTypeGroups,
}: {
  subject: Subject;
  intialExams: Exam[];
  examTypes: ExamType[];
  examTypeGroups: ExamTypeGroup[];
}) {
  const { t } = useTranslation();
  const [exams, setExams] = useState(intialExams);

  // Calculate the average grade using memo to prevent unnecessary recalculations
  const averageGrade = useMemo(() => {
    return calculateAverageGrade(exams, examTypes, examTypeGroups);
  }, [exams, examTypes, examTypeGroups]);

  async function handleAddExam(newExam: NewExam) {
    const data = await addExam(newExam, subject.id);
    setExams((prev) => [...prev, ...data]);
  }

  async function handleEditExam(exam: Exam) {
    try {
      const data = await editExam(exam);
      if (data && data[0]) {
        setExams((prev) =>
          prev.map((ex) => (ex.id === data[0].id ? data[0] : ex)),
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(t("common.error"));
    }
  }

  async function handleDeleteExam(id: number) {
    try {
      const data = await deleteExam(id);
      console.log(data);
      setExams((prev) => prev.filter((exam) => exam.id !== id));
    } catch (error) {
      console.error(error);
      toast.error(t("common.error"));
    }
  }

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
          <div className={`text-xl font-bold text-${subject?.color}-500`}>
            {averageGrade === null ? "" : `⌀ ${averageGrade.toFixed(2)}`}
          </div>
        </div>
        {subject && (
          <div className="mt-4 w-full sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
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
              <AddExamDialog
                examTypes={examTypes}
                onAdd={(exam) => handleAddExam(exam)}
              >
                <Button variant="outline" className="w-full sm:hidden">
                  <Plus className="mr-2 h-5 w-5" />
                  {t("common.add")}
                </Button>
              </AddExamDialog>
            </div>
            <AddExamDialog
              examTypes={examTypes}
              onAdd={(exam) => handleAddExam(exam)}
            >
              <Button className="hidden sm:flex">
                <Plus className="mr-2 h-5 w-5" />
                {t("common.add")}
              </Button>
            </AddExamDialog>
          </div>
        )}
      </div>

      <div className="mt-4">
        <ExamList
          examTypes={examTypes}
          onEdit={(exam) => handleEditExam(exam)}
          onDelete={(id) => handleDeleteExam(id)}
          exams={exams}
          color={subject?.color}
        />
      </div>
    </main>
  );
}
