"use client";

import { UserRound, MapPin, Plus, Pencil } from "lucide-react";
import Badge from "@/components/shared/badge";
import SubjectIcon from "@/components/shared/subject-icon";
import { Button } from "@/components/ui/button";
import { Subject } from "@/types/subjects";
import ExamList from "../exams/exam-list";
import { Exam, ExamType, NewExam } from "@/types/exams";
import { AddExamDialog } from "../exams/add-exam-dialog";
import { useState, useMemo, useEffect } from "react";
import { addExam, deleteExam, editExam } from "@/app/actions/exams";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/use-translation";
import { calculateAverageGrade } from "@/lib/grades";
import { ExamTypeGroup } from "@/types/exams";
import { DeleteSubjectDialog } from "./delete-subject-dialog";
import { deleteSubject } from "@/app/actions/subjects";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubjectStatistics } from "./subject-statistics";
import { SchoolYearSettings } from "@/types/school-year";
import { updateSubjectAverageGrade } from "@/app/actions/subjects";

interface SubjectContentProps {
  subject: Subject;
  intialExams: Exam[];
  examTypes: ExamType[];
  examTypeGroups: ExamTypeGroup[];
  settings?: SchoolYearSettings;
  gradingSystem: string;
}

export default function SubjectContent({
  subject,
  intialExams,
  examTypes,
  examTypeGroups,
  settings,
  gradingSystem,
}: SubjectContentProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [exams, setExams] = useState(intialExams);
  const showStatistics = settings?.enableStatistics ?? false;

  // Calculate the average grade using memo to prevent unnecessary recalculations
  const averageGrade = useMemo(() => {
    return calculateAverageGrade(exams, examTypes, examTypeGroups);
  }, [exams, examTypes, examTypeGroups]);

  // Check and update average grade if it's different from the stored one
  useEffect(() => {
    if (averageGrade !== subject.average_grade) {
      updateSubjectAverageGrade(subject.id, averageGrade).catch(console.error);
    }
  }, [averageGrade, subject.id, subject.average_grade]);

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

  async function handleDeleteSubject() {
    try {
      await deleteSubject(subject.id);
      router.push("/subjects");
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
            <div className="flex items-center gap-1">
              <Link href={`/subjects/${subject.id}/edit`}>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
              <DeleteSubjectDialog onDelete={handleDeleteSubject} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`text-xl font-bold text-${subject?.color}-500`}>
              {averageGrade === null ? "" : `⌀ ${averageGrade.toFixed(2)}`}
            </div>
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
                gradingSystem={gradingSystem}
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
              gradingSystem={gradingSystem}
            >
              <Button className="hidden sm:flex">
                <Plus className="mr-2 h-5 w-5" />
                {t("common.add")}
              </Button>
            </AddExamDialog>
          </div>
        )}
      </div>

      {showStatistics ? (
        <Tabs defaultValue="exams" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="exams">{t("exams")}</TabsTrigger>
            <TabsTrigger value="statistics">{t("statistics")}</TabsTrigger>
          </TabsList>
          <TabsContent value="exams" className="mt-6">
            <ExamList
              examTypes={examTypes}
              onEdit={(exam) => handleEditExam(exam)}
              onDelete={(id) => handleDeleteExam(id)}
              exams={exams}
              color={subject?.color}
              gradingSystem={gradingSystem}
            />
          </TabsContent>
          <TabsContent value="statistics" className="mt-6">
            <SubjectStatistics
              exams={exams}
              examTypes={examTypes}
              examTypeGroups={examTypeGroups}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="mt-6">
          <ExamList
            examTypes={examTypes}
            onEdit={(exam) => handleEditExam(exam)}
            onDelete={(id) => handleDeleteExam(id)}
            exams={exams}
            color={subject?.color}
            gradingSystem={gradingSystem}
          />
        </div>
      )}
    </main>
  );
}
