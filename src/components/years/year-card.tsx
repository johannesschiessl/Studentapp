"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SchoolYear } from "@/types/school-year";
import { useTranslation } from "@/hooks/use-translation";

interface SchoolYearCardProps {
  year: SchoolYear;
  selectAction: (formData: FormData) => Promise<void>;
}

export default function YearCard({ year, selectAction }: SchoolYearCardProps) {
  const { t } = useTranslation();

  return (
    <form
      action={selectAction}
      className="group cursor-pointer"
      onClick={(e) => {
        const form = e.currentTarget;
        form.requestSubmit();
      }}
    >
      <input type="hidden" name="yearId" value={year.id} />
      <Card className="transition-all hover:bg-muted">
        <CardHeader>
          <CardTitle>
            {year.class}
            {t("years.class_number")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t("years.region")}:{" "}
            {year.vacation_region.startsWith("de_")
              ? year.vacation_region
                  .split("_")
                  .slice(1)
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ") + ", Deutschland"
              : year.vacation_region.startsWith("at_")
                ? year.vacation_region
                    .split("_")
                    .slice(1)
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ") + ", Österreich"
                : t("years.other_region")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("years.grading")}:{" "}
            {year.grading_system === "de_full_grades"
              ? t("years.full_grades")
              : year.grading_system === "at_full_grades"
                ? t("years.full_grades_1-5")
                : year.grading_system}
          </p>
          <Button type="submit" variant="outline" className="mt-4 w-full">
            {t("years.select")}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
