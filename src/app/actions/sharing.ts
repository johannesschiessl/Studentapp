"use server";

import { createClient } from "@/lib/supabase/server";
import {
  SharedItem,
  ShareSubjectsRequest,
  ImportSharedSubjectsRequest,
} from "@/types/sharing";
import { Subject, SubjectCreateInput } from "@/types/subjects";
import { revalidatePath } from "next/cache";

// First, let's add a type for the shared subject data
type SharedSubjectData = Pick<
  Subject,
  "name" | "teacher" | "room" | "color" | "icon"
>;

export async function shareSubjects(
  request: ShareSubjectsRequest,
): Promise<SharedItem> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get subjects to share
  const { data: subjects, error: subjectsError } = await supabase
    .from("subjects")
    .select("name, teacher, room, color, icon")
    .in("id", request.subjects);

  if (subjectsError) throw subjectsError;
  if (!subjects?.length) throw new Error("No subjects found");

  // Create shared item
  const { data, error } = await supabase
    .from("shared_items")
    .insert({
      user_id: user.id,
      type: "subject",
      data: subjects,
      title: request.title,
      description: request.description,
      active: true,
    })
    .select()
    .single();

  if (error) throw error;

  return data as SharedItem;
}

export async function getSharedItem(id: string): Promise<SharedItem> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("shared_items")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .single();

  if (error) throw error;
  return data as SharedItem;
}

export async function importSharedSubjects(
  request: ImportSharedSubjectsRequest,
): Promise<Subject[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get shared item
  const sharedItem = await getSharedItem(request.sharedItemId);
  if (sharedItem.type !== "subject")
    throw new Error("Invalid shared item type");

  // Type assertion with proper type
  const sharedSubjects = sharedItem.data as SharedSubjectData[];

  // Insert subjects
  const subjectsToInsert: SubjectCreateInput[] = sharedSubjects.map(
    (subject) => ({
      ...subject,
      user_id: user.id,
      school_year_id: Number(request.schoolYearId),
    }),
  );

  const { data: newSubjects, error } = await supabase
    .from("subjects")
    .insert(subjectsToInsert)
    .select();

  if (error) throw error;

  revalidatePath("/subjects");
  return newSubjects as Subject[];
}
