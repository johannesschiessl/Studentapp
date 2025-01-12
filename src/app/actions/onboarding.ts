"use server";

import { cookies } from "next/headers";

export async function completeOnboarding() {
  cookies().set("seenOnboarding", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
}
