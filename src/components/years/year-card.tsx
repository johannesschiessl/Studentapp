"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SchoolYear } from "@/types/school-year";

interface SchoolYearCardProps {
  year: SchoolYear;
  selectAction: (formData: FormData) => Promise<void>;
}

export default function YearCard({ year, selectAction }: SchoolYearCardProps) {
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
          <CardTitle>{year.class}th Class</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Region:{" "}
            {year.vacation_region === "de_bavaria"
              ? "Bavaria, Germany"
              : year.vacation_region}
          </p>
          <p className="text-sm text-muted-foreground">
            Grading:{" "}
            {year.grading_system === "de_full_grades"
              ? "Full Grades (1-6)"
              : year.grading_system}
          </p>
          <Button type="submit" variant="outline" className="mt-4 w-full">
            Select Year
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
