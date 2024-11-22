"use server";

import { createClient } from "@/lib/supabase/server";
import { Task } from "@/types/homework";
import { getCurrentSchoolYearId } from "./school-year";
import {
  validateStringLength,
  STRING_LIMITS,
} from "@/lib/validation/string-limits";
import {
  RESOURCE_LIMITS,
  checkResourceLimit,
} from "@/lib/validation/resource-limits";

export async function getHomeworkForCurrentSchoolYear(): Promise<Task[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const currentSchoolYearId = await getCurrentSchoolYearId();

  const { data, error } = await supabase
    .from("homework")
    .select("*")
    .eq("user_id", user.id)
    .eq("school_year_id", currentSchoolYearId);

  if (error) {
    console.error("Error fetching homework:", error);
    throw error;
  }

  return data as Task[];
}

export async function toggleTaskDone(id: number, currentDone: boolean) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("homework")
    .update({ done: !currentDone })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function addTask(task: Omit<Task, "id">) {
  validateStringLength(task.task, STRING_LIMITS.LONG_TEXT);

  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("Not authenticated");

  const currentSchoolYearId = await getCurrentSchoolYearId();

  // Check homework limit
  await checkResourceLimit(
    supabase,
    "homework",
    "id",
    { school_year_id: currentSchoolYearId },
    RESOURCE_LIMITS.HOMEWORK_PER_SCHOOL_YEAR,
    "You have reached the maximum limit of homework tasks (500) for this school year",
  );

  const { data, error } = await supabase
    .from("homework")
    .insert({
      ...task,
      user_id: user.user.id,
      school_year_id: currentSchoolYearId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding task:", error);
    throw error;
  }

  return data;
}

export async function editTask(task: Task) {
  validateStringLength(task.task, STRING_LIMITS.LONG_TEXT);

  const supabase = createClient();

  const { id, ...updateData } = task;

  const { data, error } = await supabase
    .from("homework")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function deleteTask(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase.from("homework").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
