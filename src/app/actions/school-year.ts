"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { SchoolYear, TimeTable } from "@/types/school-year";

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
  } else {
    return data as SchoolYear;
  }
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
