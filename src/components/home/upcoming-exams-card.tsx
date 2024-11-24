"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Exam, ExamType } from "@/types/exams";
import { Subject } from "@/types/subjects";
import SubjectIcon from "@/components/shared/subject-icon";
import { format, formatDistanceToNow } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { useTranslation } from "@/hooks/use-translation";

interface UpcomingExamsCardProps {
  exams: (Exam & { exam_type: ExamType })[];
  subjects: Subject[];
}

export default function UpcomingExamsCard({
  exams,
  subjects,
}: UpcomingExamsCardProps) {
  const { t, language } = useTranslation();

  const dateLocale = language === "de" ? de : enUS;

  if (exams.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("home.upcomingExams.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t("home.upcomingExams.noExams")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("home.upcomingExams.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exams.map((exam) => {
            const subject = subjects.find((s) => s.id === exam.subject_id);
            if (!subject) return null;

            const examDate = new Date(exam.date_written);
            const timeUntil = formatDistanceToNow(examDate, {
              addSuffix: true,
              locale: dateLocale,
            });

            return (
              <div key={exam.id} className="flex items-center gap-3">
                <SubjectIcon
                  icon={subject.icon}
                  color={subject.color}
                  size="default"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">
                      {exam.exam_type.name} in {subject.name}
                    </p>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {exam.description || t("home.upcomingExams.noDescription")}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {timeUntil}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {format(examDate, "MMM d", { locale: dateLocale })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(examDate, "EEEE", { locale: dateLocale })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
