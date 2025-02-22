"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { SchoolYear, TimeTable, SchoolYearSettings } from "@/types/school-year";
import { addExamType, addExamTypeGroup } from "./exams";
import {
  RESOURCE_LIMITS,
  checkResourceLimit,
} from "@/lib/validation/resource-limits";

export async function getSchoolYear(id: number): Promise<SchoolYear> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("school_years")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }

  const defaultSettings: SchoolYearSettings = {
    enableStatistics: false,
  };

  return {
    ...data,
    settings: {
      ...defaultSettings,
      ...data.settings,
    },
  } as SchoolYear;
}

export async function getTimeTable(): Promise<TimeTable> {
  const supabase = createClient();

  const id = await getCurrentSchoolYearId();

  const { data, error } = await supabase
    .from("school_years")
    .select("timetable")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching timetable:", error);
    throw error;
  }

  return (
    data.timetable || {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    }
  );
}

export async function getCurrentSchoolYearId(): Promise<number> {
  const cookieStore = cookies();
  const currentSchoolYearId = cookieStore.get("currentSchoolYearId");
  return currentSchoolYearId ? parseInt(currentSchoolYearId.value, 10) : 0;
}

export async function setCurrentSchoolYearId(id: number) {
  cookies().set("currentSchoolYearId", id.toString(), {
    path: "/",
    maxAge: 31536000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  revalidatePath("/");
}

export async function createSchoolYear(
  data: Partial<SchoolYear>,
): Promise<SchoolYear> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Check school year limit
  await checkResourceLimit(
    supabase,
    "school_years",
    "id",
    { user_id: user.id },
    RESOURCE_LIMITS.SCHOOL_YEARS_PER_USER,
    "You have reached the maximum limit of school years (4)",
  );

  const newSchoolYear = {
    ...data,
    user_id: user.id,
    grading_system: data.grading_system || "de_full_grades",
    vacation_region: data.vacation_region || "de_bavaria",
    timetable: data.timetable || {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    },
    settings: {
      enableStatistics: false,
      ...data.settings,
    },
  };

  const { data: schoolYear, error } = await supabase
    .from("school_years")
    .insert(newSchoolYear)
    .select()
    .single();

  if (error) {
    console.error("Error creating school year:", error);
    throw error;
  }

  await setCurrentSchoolYearId(schoolYear.id);

  const writtenGroup = await addExamTypeGroup({
    name: "Schriftlich",
    weight: 2,
  });

  const oralGroup = await addExamTypeGroup({
    name: "Mündlich",
    weight: 1,
  });

  await addExamType({
    name: "Schulaufgabe",
    group_id: writtenGroup[0].id,
    weight: 1,
  });

  await addExamType({
    name: "Stegreifaufgabe",
    group_id: oralGroup[0].id,
    weight: 1,
  });

  await addExamType({
    name: "Abfrage",
    group_id: oralGroup[0].id,
    weight: 1,
  });

  await addExamType({
    name: "Mündliche Mitarbeit",
    group_id: oralGroup[0].id,
    weight: 1,
  });

  await addExamType({
    name: "Referat",
    group_id: oralGroup[0].id,
    weight: 1,
  });

  await addExamType({
    name: "Kurzarbeit",
    group_id: oralGroup[0].id,
    weight: 1,
  });

  await addExamType({
    name: "Vokabeltest",
    group_id: oralGroup[0].id,
    weight: 1,
  });

  return schoolYear as SchoolYear;
}

export async function getAllSchoolYears(): Promise<SchoolYear[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("school_years")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching school years:", error);
    throw error;
  }

  return data as SchoolYear[];
}

export async function updateTimeTable(timetable: TimeTable): Promise<void> {
  const supabase = createClient();
  const id = await getCurrentSchoolYearId();

  const { error } = await supabase
    .from("school_years")
    .update({ timetable })
    .eq("id", id);

  if (error) {
    console.error("Error updating timetable:", error);
    throw error;
  }

  revalidatePath("/timetable");
}

export async function updateSchoolYearSettings(
  settings: SchoolYearSettings,
): Promise<void> {
  const supabase = createClient();
  const id = await getCurrentSchoolYearId();

  const { error } = await supabase
    .from("school_years")
    .update({ settings })
    .eq("id", id);

  if (error) {
    console.error("Error updating settings:", error);
    throw error;
  }

  revalidatePath("/subjects/[id]", "page");
}
