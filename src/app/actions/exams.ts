"use server";

import { createClient } from "@/lib/supabase/server";
import { Exam, ExamType, ExamTypeGroup } from "@/types/exams";
import { NewExamTypeGroup, NewExamType, NewExam } from "@/types/exams";
import { getCurrentSchoolYearId } from "./school-year";
import {
  validateStringLength,
  STRING_LIMITS,
} from "@/lib/validation/string-limits";
import {
  RESOURCE_LIMITS,
  checkResourceLimit,
} from "@/lib/validation/resource-limits";
import { calculateAverageGrade } from "@/lib/grades";
import { updateSubjectAverageGrade } from "./subjects";

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
  if (!user) throw new Error("User not authenticated");

  const schoolYearId = await getCurrentSchoolYearId();

  // Check exam limit
  await checkResourceLimit(
    supabase,
    "exams",
    "id",
    { school_year_id: schoolYearId },
    RESOURCE_LIMITS.EXAMS_PER_SCHOOL_YEAR,
    "You have reached the maximum limit of exams (150) for this school year",
  );

  if (exam.description) {
    validateStringLength(exam.description, STRING_LIMITS.LONG_TEXT);
  }

  const { data, error } = await supabase
    .from("exams")
    .insert({
      ...exam,
      subject_id,
      user_id: user.id,
      school_year_id: schoolYearId,
    })
    .select("*");

  if (error) {
    console.error("Error adding exam:", error);
    throw error;
  }

  // After adding the exam, fetch all exams for this subject and recalculate average
  const allExams = await getExamsForSubject(subject_id);
  const examTypes = await getExamTypesForCurrentSchoolYear();
  const examTypeGroups = await getExamTypeGroupsForCurrentSchoolYear();
  const newAverage = calculateAverageGrade(allExams, examTypes, examTypeGroups);
  await updateSubjectAverageGrade(subject_id, newAverage);

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

  if (exam.description) {
    validateStringLength(exam.description, STRING_LIMITS.LONG_TEXT);
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

  // After editing the exam, recalculate average
  const allExams = await getExamsForSubject(exam.subject_id);
  const examTypes = await getExamTypesForCurrentSchoolYear();
  const examTypeGroups = await getExamTypeGroupsForCurrentSchoolYear();
  const newAverage = calculateAverageGrade(allExams, examTypes, examTypeGroups);
  await updateSubjectAverageGrade(exam.subject_id, newAverage);

  return data;
}

export async function deleteExam(id: number) {
  const supabase = createClient();

  // First get the exam to know its subject_id
  const { data: examData } = await supabase
    .from("exams")
    .select("subject_id")
    .eq("id", id)
    .single();

  if (!examData) {
    throw new Error("Exam not found");
  }

  const { error } = await supabase.from("exams").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  // After deleting the exam, recalculate average
  const allExams = await getExamsForSubject(examData.subject_id);
  const examTypes = await getExamTypesForCurrentSchoolYear();
  const examTypeGroups = await getExamTypeGroupsForCurrentSchoolYear();
  const newAverage = calculateAverageGrade(allExams, examTypes, examTypeGroups);
  await updateSubjectAverageGrade(examData.subject_id, newAverage);

  return examData;
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
  const schoolYearId = await getCurrentSchoolYearId();

  // Check exam group limit
  await checkResourceLimit(
    supabase,
    "exam_type_groups",
    "id",
    { school_year_id: schoolYearId },
    RESOURCE_LIMITS.EXAM_GROUPS_PER_SCHOOL_YEAR,
    "You have reached the maximum limit of exam groups (5) for this school year",
  );

  validateStringLength(newGroup.name);

  const { data, error } = await supabase
    .from("exam_type_groups")
    .insert({ ...newGroup, school_year_id: schoolYearId })
    .select("*");

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function addExamType(newExamType: NewExamType) {
  const supabase = createClient();
  const schoolYearId = await getCurrentSchoolYearId();

  // Check exam type limit for the specific group
  await checkResourceLimit(
    supabase,
    "exam_types",
    "id",
    { group_id: newExamType.group_id },
    RESOURCE_LIMITS.EXAM_TYPES_PER_GROUP,
    "You have reached the maximum limit of exam types (10) for this group",
  );

  validateStringLength(newExamType.name);

  const { data, error } = await supabase
    .from("exam_types")
    .insert({
      ...newExamType,
      school_year_id: schoolYearId,
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

export async function getUpcomingExams(): Promise<
  (Exam & { exam_type: ExamType })[]
> {
  const supabase = createClient();
  const currentSchoolYearId = await getCurrentSchoolYearId();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const today = new Date().toISOString();

  const { data, error } = await supabase
    .from("exams")
    .select(
      `
      *,
      exam_type:exam_types(*)
    `,
    )
    .eq("school_year_id", currentSchoolYearId)
    .eq("user_id", user.id)
    .gte("date_written", today)
    .order("date_written", { ascending: true })
    .limit(5);

  if (error) {
    console.error("Error fetching upcoming exams:", error);
    throw error;
  }

  return data as (Exam & { exam_type: ExamType })[];
}
