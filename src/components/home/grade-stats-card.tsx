"use client";

import { Subject } from "@/types/subjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { calculateTotalAverageGrade } from "@/lib/grades";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SchoolYearSettings } from "@/types/school-year";

function calculateGradeDistribution(subjects: Subject[]) {
  // Initialize counters for each grade (1-6)
  const distribution = Array.from({ length: 6 }, (_, i) => ({
    grade: (i + 1).toString(),
    count: 0,
  }));

  subjects.forEach((subject) => {
    if (subject.average_grade !== null && subject.average_grade !== undefined) {
      // Round the grade according to our rules
      let roundedGrade = subject.average_grade;
      if (roundedGrade === 1.5) {
        roundedGrade = 1;
      } else {
        const decimalPart = roundedGrade % 1;
        roundedGrade =
          decimalPart > 0.5
            ? Math.ceil(roundedGrade)
            : Math.floor(roundedGrade);
      }
      // Increment the counter for this grade
      distribution[roundedGrade - 1].count++;
    }
  });

  return distribution;
}

const chartConfig = {
  grade: {
    label: "Grade",
    color: "hsl(var(--chart-1))",
  },
};

interface GradeStatsCardProps {
  subjects: Subject[];
  settings?: SchoolYearSettings;
}

export default function GradeStatsCard({
  subjects,
  settings,
}: GradeStatsCardProps) {
  const { t } = useTranslation();
  const totalAverageGrade = calculateTotalAverageGrade(subjects);
  const showStatistics = settings?.enableStatistics ?? false;

  if (totalAverageGrade === null) return null;

  // If statistics are disabled, show only the total average
  if (!showStatistics) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <h2 className="text-lg font-semibold text-muted-foreground">
            {t("subjects.total_average")}
          </h2>
          <p className="mt-2 text-4xl font-bold">
            ⌀{totalAverageGrade.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate additional statistics only if enabled
  const gradeDistribution = calculateGradeDistribution(subjects);
  const subjectsWithGrades = subjects.filter(
    (s) => s.average_grade !== null && s.average_grade !== undefined,
  );
  const bestSubject = subjectsWithGrades.reduce(
    (best, current) =>
      (current.average_grade || 0) < (best?.average_grade || Infinity)
        ? current
        : best,
    subjectsWithGrades[0],
  );
  const worstSubject = subjectsWithGrades.reduce(
    (worst, current) =>
      (current.average_grade || 0) > (worst?.average_grade || -Infinity)
        ? current
        : worst,
    subjectsWithGrades[0],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="mb-6 flex items-center justify-between">
            {t("subjects.grade_stats")}
            <p className="text-4xl font-bold">
              ⌀{totalAverageGrade.toFixed(2)}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">
              {t("subjects.best_subject")}
            </p>
            <p className="mt-1 font-medium">
              {bestSubject?.name} (⌀{bestSubject?.average_grade?.toFixed(2)})
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">
              {t("subjects.worst_subject")}
            </p>
            <p className="mt-1 font-medium">
              {worstSubject?.name} (⌀{worstSubject?.average_grade?.toFixed(2)})
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            {t("subjects.grade_distribution")}
          </p>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={gradeDistribution}>
              <CartesianGrid vertical={false} className="stroke-border" />
              <XAxis
                dataKey="grade"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-sm text-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-sm text-muted-foreground"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent labelKey="grade" nameKey="grade" />
                }
              />
              <Bar
                dataKey="count"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
