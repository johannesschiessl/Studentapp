import { redirect } from "next/navigation";
import {
  getAllSchoolYears,
  setCurrentSchoolYearId,
} from "@/app/actions/school-year";
import YearsContent from "@/components/years/years-content";

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
    <YearsContent schoolYears={schoolYears} selectAction={selectYearAction} />
  );
}
