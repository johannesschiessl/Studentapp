"use server";

import { createClient } from "@/lib/supabase/server";
import { Task } from "@/types/homework";
import { getCurrentSchoolYearId } from "./school-year";
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
  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("Not authenticated");

  const currentSchoolYearId = await getCurrentSchoolYearId();

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
