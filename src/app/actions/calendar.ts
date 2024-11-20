"use server";

import { getTimeTable } from "@/app/actions/school-year";
import { getSubject } from "@/app/actions/subjects";
import { Event } from "@/types/calendar";
import { TimeTable, TimeTableItem } from "@/types/school-year";

export async function transformTimetableToEvents(
  date: Date,
  timetable: TimeTable,
): Promise<Event[]> {
  const dayName = date
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const timetableItems = timetable[dayName] || [];

  const transformedItems = await Promise.all(
    timetableItems
      .filter((item: TimeTableItem) => item.start_time && item.end_time)
      .map(async (item: TimeTableItem) => {
        const [startHour, startMinute] = item.start_time.split(":").map(Number);
        const [endHour, endMinute] = item.end_time.split(":").map(Number);
        const start = new Date(date);
        start.setHours(startHour, startMinute);

        const end = new Date(date);
        end.setHours(endHour, endMinute);

        const subject = await getSubject(parseInt(item.subject_id));
        return {
          id: parseInt(item.subject_id),
          title: `${subject.name}`,
          description: `Room: ${item.room || subject.room}, Teacher: ${subject.teacher}`,
          room: item.room || subject.room,
          start,
          end,
          isAllDay: false,
          color: subject.color,
          icon: subject.icon,
        } as Event;
      }),
  );

  return transformedItems;
}

export async function getWeekTimetableEvents(weekStart: string) {
  const timetable = await getTimeTable();

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  const weekEvents = await Promise.all(
    weekDates.map((date) => transformTimetableToEvents(date, timetable)),
  );

  return weekEvents.flat();
}

export async function getDayTimetableEvents(date: string) {
  const timetable = await getTimeTable();
  return transformTimetableToEvents(new Date(date), timetable);
}
