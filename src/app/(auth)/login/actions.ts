"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function handleGoogleLogin() {
  const supabase = createClient();
  const orign = headers().get("origin");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${orign}/auth/callback`,
    },
  });

  console.log(data);

  if (error) {
    console.error(error.message);
    throw error;
  } else {
    redirect(data.url);
  }
}
