import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getAllSchoolYears,
  setCurrentSchoolYearId,
} from "@/app/actions/school-year";
import Link from "next/link";
import { X, Plus } from "lucide-react";
import YearCard from "@/components/years/year-card";

async function selectYearAction(formData: FormData) {
  "use server";

  const id = formData.get("yearId");
  if (!id || typeof id !== "string") {
    throw new Error("Invalid year ID");
  }

  await setCurrentSchoolYearId(parseInt(id, 10));
  redirect("/home");
}

export default async function YearsPage() {
  const schoolYears = await getAllSchoolYears();

  return (
    <>
      <Link
        href="/home"
        className="fixed right-6 top-6 z-50 rounded-full bg-background p-3 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <X className="h-6 w-6" />
      </Link>

      <div className="relative mx-auto max-w-4xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">Select School Year</h1>
        </div>

        <Link href="/new" className="mb-8 block">
          <Button className="w-full gap-2" size="lg">
            <Plus className="h-5 w-5" />
            Create New School Year
          </Button>
        </Link>

        <div className="grid gap-4 md:grid-cols-2">
          {schoolYears.map((year) => (
            <YearCard
              key={year.id}
              year={year}
              selectAction={selectYearAction}
            />
          ))}
        </div>

        {schoolYears.length === 0 && (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">No school years found.</p>
            <Link href="/new">
              <Button className="mt-4 gap-2">
                <Plus className="h-5 w-5" />
                Create Your First School Year
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
