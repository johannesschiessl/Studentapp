"use server";

import { createClient } from "@/lib/supabase/server";
import { Subject } from "@/types/subjects";
import { getCurrentSchoolYearId } from "./school-year";

export async function getSubjectsForCurrentSchoolYear(): Promise<Subject[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const currentSchoolYearId = await getCurrentSchoolYearId();

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

export async function getSubject(id: number): Promise<Subject> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  } else {
    return data as Subject;
  }
}

export async function createSubject(
  subject: Omit<Subject, "id">,
): Promise<Subject> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const currentSchoolYearId = await getCurrentSchoolYearId();

  const { data, error } = await supabase
    .from("subjects")
    .insert({
      ...subject,
      user_id: user.id,
      school_year_id: currentSchoolYearId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating subject:", error);
    throw error;
  }

  return data as Subject;
}
