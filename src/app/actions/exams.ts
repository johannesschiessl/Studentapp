"use server";

import { createClient } from "@/lib/supabase/server";
import { Exam, ExamType, ExamTypeGroup } from "@/types/exams";
import { NewExamTypeGroup, NewExamType, NewExam } from "@/types/exams";
import { getCurrentSchoolYearId } from "./school-year";

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

export async function addExam(exam: NewExam, subject_id: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("exams")
    .insert({
      ...exam,
      subject_id,
      user_id: user.id,
    })
    .select("*");

  if (error) {
    console.error("Error adding exam:", error);
    throw error;
  }

  return data;
}

export async function editExam(exam: Exam) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const formattedExam = {
    exam_type_id: exam.exam_type_id,
    grade: exam.grade,
    grade_modifier: exam.grade_modifier,
    description: exam.description,
    date_written: exam.date_written.toISOString(),
    date_returned: exam.date_returned?.toISOString() || null,
  };

  const { data, error } = await supabase
    .from("exams")
    .update(formattedExam)
    .eq("id", exam.id)
    .eq("user_id", user.id)
    .select();

  if (error) {
    console.error("Error updating exam:", error);
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

  const currentSchoolYearId = await getCurrentSchoolYearId();

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

  const currentSchoolYearId = await getCurrentSchoolYearId();

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

export async function addExamTypeGroup(newGroup: NewExamTypeGroup) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exam_type_groups")
    .insert({ ...newGroup, school_year_id: await getCurrentSchoolYearId() })
    .select("*");

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function addExamType(newExamType: NewExamType) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exam_types")
    .insert({
      ...newExamType,
      school_year_id: await getCurrentSchoolYearId(),
    })
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
