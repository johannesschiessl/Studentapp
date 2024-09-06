"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Subject } from "@/types/subjects";
import { revalidatePath } from "next/cache";

export async function getSubjectsForCurrentSchoolYear(): Promise<Subject[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const currentSchoolYearId = getCurrentSchoolYearId();

  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("user_id", user.id)
    .eq("school_year_id", currentSchoolYearId);

  if (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }

  return data as Subject[];
}

function getCurrentSchoolYearId(): number {
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
