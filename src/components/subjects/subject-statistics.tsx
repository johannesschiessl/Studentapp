"use client";

import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Exam, ExamType, ExamTypeGroup } from "@/types/exams";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

interface StatisticsProps {
  exams: Exam[];
  examTypes: ExamType[];
  examTypeGroups: ExamTypeGroup[];
}

export function SubjectStatistics({ exams, examTypes }: StatisticsProps) {
  const { t } = useTranslation();

  const gradedExamsCount = useMemo(() => {
    return exams.filter((exam) => exam.grade != null).length;
  }, [exams]);

  const gradeDistribution = useMemo(() => {
    const distribution = new Array(6).fill(0);
    exams.forEach((exam) => {
      if (exam.grade) {
        distribution[Math.floor(exam.grade) - 1]++;
      }
    });
    return Array.from({ length: 6 }, (_, i) => ({
      grade: (i + 1).toString(),
      count: distribution[i],
    }));
  }, [exams]);

  const gradeTimeline = useMemo(() => {
    return exams
      .filter((exam) => exam.grade)
      .sort(
        (a, b) =>
          new Date(a.date_written).getTime() -
          new Date(b.date_written).getTime(),
      )
      .map((exam) => ({
        date: new Date(exam.date_written).toLocaleDateString(),
        grade: exam.grade,
      }));
  }, [exams]);

  const examTypeAverages = useMemo(() => {
    const averages = new Map<string, { sum: number; count: number }>();

    exams.forEach((exam) => {
      if (exam.grade) {
        const type = examTypes.find(
          (t) => t.id.toString() === exam.exam_type_id.toString(),
        );
        if (type) {
          const current = averages.get(type.name) || { sum: 0, count: 0 };
          averages.set(type.name, {
            sum: current.sum + exam.grade,
            count: current.count + 1,
          });
        }
      }
    });

    return Array.from(averages.entries()).map(([name, { sum, count }]) => ({
      name,
      average: Number((sum / count).toFixed(2)),
    }));
  }, [exams, examTypes]);

  const maxCount = useMemo(() => {
    return Math.max(...gradeDistribution.map((d) => d.count));
  }, [gradeDistribution]);

  // Chart configurations
  const distributionConfig = {
    count: {
      label: t("statistics.count"),
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const timelineConfig = {
    grade: {
      label: t("statistics.grade"),
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const averagesConfig = {
    average: {
      label: t("statistics.average"),
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  // Add responsive breakpoint detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Optimize data for mobile
  const optimizedTimeline = useMemo(() => {
    const data = [...gradeTimeline];
    if (isMobile && data.length > 8) {
      // Show only last 8 entries on mobile
      return data.slice(-8);
    }
    return data;
  }, [gradeTimeline, isMobile]);

  const optimizedExamTypes = useMemo(() => {
    return examTypeAverages.map((item) => ({
      ...item,
      // Truncate long names on mobile
      displayName: isMobile
        ? item.name.slice(0, 15) + (item.name.length > 15 ? "..." : "")
        : item.name,
    }));
  }, [examTypeAverages, isMobile]);

  if (gradedExamsCount < 2) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          {t("statistics.not_enough_data")}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("statistics.add_more_exams")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <Card className="max-w-full overflow-hidden md:col-span-2">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>{t("statistics.gradeTimeline")}</CardTitle>
          <CardDescription>
            {t("statistics.gradeTimelineDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <div className="relative w-full overflow-hidden">
            <ChartContainer
              config={timelineConfig}
              className="h-[400px] w-full sm:h-[300px]"
            >
              {isMobile ? (
                // Mobile-optimized vertical timeline
                <LineChart
                  data={optimizedTimeline}
                  layout="vertical"
                  margin={{ top: 20, right: 30, bottom: 20, left: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} />
                  <YAxis
                    dataKey="date"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    width={70}
                    tick={{ fontSize: 12 }}
                  />
                  <XAxis
                    type="number"
                    domain={[0.5, 6.5]}
                    ticks={[1, 2, 3, 4, 5, 6]}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="grade"
                    stroke="var(--color-grade)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-grade)", r: 6 }}
                  />
                </LineChart>
              ) : (
                // Desktop horizontal timeline
                <LineChart
                  data={gradeTimeline}
                  margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={30}
                    height={60}
                    interval="preserveStartEnd"
                    angle={-45}
                    textAnchor="end"
                    dy={16}
                  />
                  <YAxis
                    reversed
                    domain={[6.5, 0.5]}
                    ticks={[1, 2, 3, 4, 5, 6]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    padding={{ top: 20, bottom: 20 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="grade"
                    stroke="var(--color-grade)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-grade)", r: 4 }}
                  />
                </LineChart>
              )}
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-full overflow-hidden">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>{t("statistics.gradeDistribution")}</CardTitle>
          <CardDescription>
            {t("statistics.gradeDistributionDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <div className="relative w-full overflow-hidden">
            <ChartContainer
              config={distributionConfig}
              className="h-[300px] w-full"
            >
              <BarChart
                data={gradeDistribution}
                layout="vertical"
                margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  domain={[0, Math.ceil(maxCount * 1.1)]}
                  tick={{ fontSize: isMobile ? 12 : 14 }}
                />
                <YAxis
                  dataKey="grade"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tick={{ fontSize: isMobile ? 12 : 14 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="count"
                  fill="var(--color-count)"
                  radius={[0, 4, 4, 0]}
                  barSize={isMobile ? 20 : 30}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-full overflow-hidden">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>{t("statistics.examTypeAverages")}</CardTitle>
          <CardDescription>
            {t("statistics.examTypeAveragesDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <div className="relative w-full overflow-hidden">
            <ChartContainer
              config={averagesConfig}
              className="h-[300px] w-full"
            >
              <BarChart
                data={optimizedExamTypes}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: isMobile ? 80 : 100,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0.5, 6.5]}
                  ticks={[1, 2, 3, 4, 5, 6]}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tick={{ fontSize: isMobile ? 12 : 14 }}
                />
                <YAxis
                  dataKey="displayName"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  width={isMobile ? 70 : 90}
                  tick={{ fontSize: isMobile ? 12 : 14 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="average"
                  fill="var(--color-average)"
                  radius={[0, 4, 4, 0]}
                  barSize={isMobile ? 20 : 30}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
