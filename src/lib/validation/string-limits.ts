export const STRING_LIMITS = {
  DEFAULT: 256,
  LONG_TEXT: 1024,
} as const;

export function validateStringLength(
  str: string,
  maxLength: number = STRING_LIMITS.DEFAULT,
): string {
  if (str && str.length > maxLength) {
    throw new Error(`String exceeds maximum length of ${maxLength} characters`);
  }
  return str;
}
