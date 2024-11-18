"use server";

import { cookies } from "next/headers";

export async function completeOnboarding() {
  cookies().set("seenOnboarding", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}
