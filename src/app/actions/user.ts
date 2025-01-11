"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getUser(): Promise<User> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  return user;
}

export async function logOutUser() {
  const supabase = createClient();
  const cookieName = "currentSchoolYearId";
  const cookies = (await import("next/headers")).cookies();
  cookies.delete(cookieName);
  await supabase.auth.signOut({ scope: "local" });
}

export async function deleteUserAccount() {
  const supabase = createAdminClient();
  const user = await getUser();

  await supabase.from("exams").delete().eq("user_id", user.id);
  await supabase.from("exam_types").delete().eq("user_id", user.id);
  await supabase.from("exam_type_groups").delete().eq("user_id", user.id);
  await supabase.from("homework").delete().eq("user_id", user.id);
  await supabase.from("subjects").delete().eq("user_id", user.id);
  await supabase.from("school_years").delete().eq("user_id", user.id);

  await supabase.auth.admin.deleteUser(user.id);
  await supabase.auth.signOut({ scope: "global" });

  const cookieName = "currentSchoolYearId";
  cookies().delete(cookieName);
}
