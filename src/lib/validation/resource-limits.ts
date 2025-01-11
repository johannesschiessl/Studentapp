import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const RESOURCE_LIMITS = {
  SCHOOL_YEARS_PER_USER: 2,
  EXAMS_PER_SCHOOL_YEAR: 100,
  HOMEWORK_PER_SCHOOL_YEAR: 400,
  SUBJECTS_PER_SCHOOL_YEAR: 20,
  EXAM_GROUPS_PER_SCHOOL_YEAR: 5,
  EXAM_TYPES_PER_GROUP: 20,
  AI_CREDITS_PER_SCHOOL_YEAR: 10,
} as const;

export class ResourceLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResourceLimitError";
  }
}

export async function checkResourceLimit(
  supabase: SupabaseClient<Database>,
  table: keyof Database["public"]["Tables"],
  count_column: string,
  where_clause: Record<string, unknown>,
  limit: number,
  error_message: string,
): Promise<void> {
  const { count, error } = await supabase
    .from(table)
    .select(count_column, { count: "exact", head: true })
    .match(where_clause);

  if (error) throw error;
  if (count && count >= limit) throw new ResourceLimitError(error_message);
}
