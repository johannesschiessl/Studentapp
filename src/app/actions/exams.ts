"use server";

import { createClient } from "@/lib/supabase/server";
import { Exam, ExamType, ExamTypeGroup } from "@/types/exams";
import { cookies } from "next/headers";

export async function getExamsForSubject(id: number): Promise<Exam[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("user_id", user.id)
    .eq("subject_id", id);

  if (error) {
    console.error("Error fetching Exams:", error);
    throw error;
  }

  return data as Exam[];
}

export async function addExam(exam: Exam, subject_id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exams")
    .insert({ ...exam, subject_id: subject_id })
    .select("*");

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function editExam(exam: Exam) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exams")
    .update({ ...exam })
    .eq("id", exam.id)
    .select("*");

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function deleteExam(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase.from("exams").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function getExamTypesForCurrentSchoolYear(): Promise<ExamType[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const currentSchoolYearId = getCurrentSchoolYearId();

  const { data, error } = await supabase
    .from("exam_types")
    .select("*")
    .eq("user_id", user.id)
    .eq("school_year_id", currentSchoolYearId);

  if (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }

  return data as ExamType[];
}

export async function getExamTypeGroupsForCurrentSchoolYear(): Promise<
  ExamTypeGroup[]
> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const currentSchoolYearId = getCurrentSchoolYearId();

  const { data, error } = await supabase
    .from("exam_type_groups")
    .select("*")
    .eq("user_id", user.id)
    .eq("school_year_id", currentSchoolYearId);

  if (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }

  return data as ExamTypeGroup[];
}

export async function addExamTypeGroup(examTypeGroup: ExamTypeGroup) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exam_type_groups")
    .insert({ ...examTypeGroup, school_year_id: getCurrentSchoolYearId() })
    .select("*");

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function addExamType(examType: ExamType) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exam_types")
    .insert({ ...examType, school_year_id: getCurrentSchoolYearId() })
    .select("*");

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function deleteExamType(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exam_types")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function deleteExamTypeGroup(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exam_type_groups")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// This function exists twice (one here and the other in ./school-year.ts) But having it here drastically speeds up the page load time, as there is no await.
function getCurrentSchoolYearId(): number {
  const cookieStore = cookies();
  const currentSchoolYearId = cookieStore.get("currentSchoolYearId");
  return currentSchoolYearId ? parseInt(currentSchoolYearId.value, 10) : 1;
}
