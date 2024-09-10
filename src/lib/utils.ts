import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeHashFromDiscordUsername(username: string) {
  if (username.endsWith("#0")) {
    return username.slice(0, -2);
  } else {
    return username;
  }
}
