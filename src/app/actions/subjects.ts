"use server";

import { createClient } from "@/lib/supabase/server";
import { Subject } from "@/types/subjects";
import { getCurrentSchoolYearId } from "./school-year";
import { revalidatePath } from "next/cache";
import { validateStringLength } from "@/lib/validation/string-limits";
import {
  RESOURCE_LIMITS,
  checkResourceLimit,
} from "@/lib/validation/resource-limits";

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

  validateStringLength(subject.name);
  if (subject.teacher) validateStringLength(subject.teacher);
  if (subject.room) validateStringLength(subject.room);
  validateStringLength(subject.icon);
  validateStringLength(subject.color);

  // Check subject limit
  await checkResourceLimit(
    supabase,
    "subjects",
    "id",
    { school_year_id: currentSchoolYearId },
    RESOURCE_LIMITS.SUBJECTS_PER_SCHOOL_YEAR,
    "You have reached the maximum limit of subjects (30) for this school year",
  );

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

  revalidatePath("/subjects");

  return data as Subject;
}

export async function updateSubject(subject: Subject): Promise<Subject> {
  const supabase = createClient();

  validateStringLength(subject.name);
  if (subject.teacher) validateStringLength(subject.teacher);
  if (subject.room) validateStringLength(subject.room);
  validateStringLength(subject.icon);
  validateStringLength(subject.color);

  const { data, error } = await supabase
    .from("subjects")
    .update({
      name: subject.name,
      teacher: subject.teacher,
      room: subject.room,
      color: subject.color,
      icon: subject.icon,
    })
    .eq("id", subject.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating subject:", error);
    throw error;
  }

  revalidatePath("/subjects");
  revalidatePath(`/subjects/${subject.id}`);

  return data as Subject;
}

export async function deleteSubject(id: number): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("subjects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting subject:", error);
    throw error;
  }
  revalidatePath("/subjects");
}

export async function toggleSubjectFavorite(
  subjectId: number,
  favorite: boolean,
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("subjects")
    .update({ favorite })
    .eq("id", subjectId);

  if (error) {
    console.error("Error toggling subject favorite:", error);
    throw error;
  }

  revalidatePath("/subjects");
}

export async function updateSubjectAverageGrade(
  subjectId: number,
  averageGrade: number | null,
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("subjects")
    .update({ average_grade: averageGrade })
    .eq("id", subjectId);

  if (error) {
    console.error("Error updating subject average grade:", error);
    throw error;
  }

  revalidatePath(`/subjects/${subjectId}`);
  revalidatePath("/subjects");
}
