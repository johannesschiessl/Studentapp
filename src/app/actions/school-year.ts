"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { SchoolYear } from "@/types/school-year";

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

export async function getTimeTable(): Promise<JSON> {
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
  } else {
    return data.timetable;
  }
}

export async function getCurrentSchoolYearId(): Promise<number> {
  const cookieStore = cookies();
  const currentSchoolYearId = cookieStore.get("currentSchoolYearId");
  return currentSchoolYearId ? parseInt(currentSchoolYearId.value, 10) : 1;
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
