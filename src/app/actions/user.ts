"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

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
