"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

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

export async function handleDiscordLogin() {
  const supabase = createClient();
  const orign = headers().get("origin");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export async function handleEmailLogin(formData: LoginFormData) {
  const supabase = createClient();

  const result = loginSchema.safeParse(formData);
  if (!result.success) {
    return { error: result.error.message };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  console.log(data);

  if (error) {
    return { error: error.message };
  }

  redirect("/home");
}
