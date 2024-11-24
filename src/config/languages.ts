export const defaultLanguage = "de";
export const languages = ["en", "de"] as const;
export type Language = (typeof languages)[number];
