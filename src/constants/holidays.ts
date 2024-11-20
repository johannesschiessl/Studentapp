import { Holiday } from "@/types/calendar";

export const HOLIDAYS: Holiday[] = []; // TODO: Add holidays

export function isHoliday(date: Date): Holiday | undefined {
  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  return HOLIDAYS.find((holiday) => {
    const holidayStart = new Date(holiday.startDate);
    const holidayStartDay = new Date(
      holidayStart.getFullYear(),
      holidayStart.getMonth(),
      holidayStart.getDate(),
    );
    const holidayEnd = new Date(holiday.endDate);
    const holidayEndDay = new Date(
      holidayEnd.getFullYear(),
      holidayEnd.getMonth(),
      holidayEnd.getDate(),
    );
    return startOfDay >= holidayStartDay && startOfDay <= holidayEndDay;
  });
}
