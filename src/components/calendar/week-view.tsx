"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  CalendarArrowDown,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as lucideIcons from "lucide-react";
import { Event } from "@/types/calendar";
import { getSubject } from "@/app/actions/subjects";
import { getTimeTable } from "@/app/actions/school-year";
import { TimeTable, TimeTableItem } from "@/types/school-year";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

const hours = Array.from({ length: 14 }, (_, i) => i + 7);

export default function WeekView({ events }: { events: Event[] }) {
  function getWeekStartDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);
    sunday.setHours(0, 0, 0, 0);
    return sunday;
  }

  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStartDate());
  const [timetable, setTimetable] = useState<TimeTable | null>(null);
  const [transformedEvents, setTransformedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      const timetableData = await getTimeTable();
      const timetable = timetableData as unknown as TimeTable;
      setTimetable(timetable);
    };
    fetchTimetable();
  }, []);

  const transformTimetableToEvents = async (
    date: Date,
    timetable: TimeTable,
  ): Promise<Event[]> => {
    const dayName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const timetableItems = timetable[dayName] || [];

    const transformedItems = await Promise.all(
      timetableItems
        .filter((item: TimeTableItem) => item.start_time && item.end_time)
        .map(async (item: TimeTableItem) => {
          const [startHour, startMinute] = item.start_time
            .split(":")
            .map(Number);
          const [endHour, endMinute] = item.end_time.split(":").map(Number);
          const start = new Date(date);
          start.setHours(startHour, startMinute);

          const end = new Date(date);
          end.setHours(endHour, endMinute);

          const subject = await getSubject(parseInt(item.subject_id));
          return {
            title: `${subject.name || "Unknown"}`,
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
  };

  useEffect(() => {
    const fetchTransformedEvents = async () => {
      if (timetable) {
        const weekEvents = await Promise.all(
          getWeekDates(currentWeekStart).map((date) =>
            transformTimetableToEvents(date, timetable),
          ),
        );
        setTransformedEvents(weekEvents.flat());
      }
    };

    fetchTransformedEvents();
  }, [currentWeekStart, timetable]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getWeekDates = (startDate: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(currentWeekStart);

  const changeWeek = (increment: number) => {
    setCurrentWeekStart((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7 * increment);
      return newDate;
    });
  };

  const getEventsForDate = (date: Date, allDay: boolean) => {
    const filteredEvents = [...events, ...transformedEvents].filter(
      (event) =>
        event.start.getDate() === date.getDate() &&
        event.start.getMonth() === date.getMonth() &&
        event.start.getFullYear() === date.getFullYear() &&
        event.isAllDay === allDay,
    );

    return filteredEvents;
  };

  const getEventPosition = (event: Event) => {
    const startHour = event.start.getHours() + event.start.getMinutes() / 60;
    const endHour = event.end.getHours() + event.end.getMinutes() / 60;
    const top = (startHour - 7) * 100;
    const height = (endHour - startHour) * 100;
    return { top, height };
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h1 className="text-2xl font-bold">
          Week {getWeekNumber(currentWeekStart)},{" "}
          {currentWeekStart.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>
        <div className="flex space-x-2">
          <Link href="/calendar/timetable">
            <Button
              className="mr-4"
              variant="outline"
              onClick={() => setCurrentWeekStart(getWeekStartDate())}
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              Edit timetable
            </Button>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="mr-4"
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentWeekStart(getWeekStartDate())}
                >
                  <CalendarArrowDown className="h-4 w-4" />
                  <span className="sr-only">Move to current week</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to current week</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" size="icon" onClick={() => changeWeek(-1)}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous week</span>
          </Button>
          <Button variant="outline" size="icon" onClick={() => changeWeek(1)}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next week</span>
          </Button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-[min-content,repeat(7,1fr)] gap-2">
          <div className="col-span-1 w-14"></div>
          {weekDates.map((date, index) => (
            <div key={index} className="p-2 text-center font-semibold">
              {daysOfWeek[index]}
              <br />
              {date.getDate()}
            </div>
          ))}

          {/* All-day events section */}
          <div className="col-span-1 w-14 text-center text-sm font-semibold">
            All-day
          </div>
          {weekDates.map((date, dateIndex) => (
            <div key={dateIndex} className="min-h-[100px] p-1">
              {getEventsForDate(date, true).map((event) => (
                <TooltipProvider key={event.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`bg-${event.color}-100 text-${event.color}-500 mb-1 truncate rounded p-1 text-xs`}
                      >
                        <div className="flex items-center font-semibold">
                          <Calendar className="mr-1 h-4 w-4" />
                          {event.title}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm">{event.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          ))}

          {/* Timetable events section */}
          <div className="col-span-8 grid grid-cols-[min-content,repeat(7,1fr)] gap-2">
            <div className="col-span-1 w-14">
              {hours.map((hour) => (
                <div key={hour} className="h-[100px] text-center text-sm">
                  {hour}:00
                </div>
              ))}
            </div>
            {weekDates.map((date, dateIndex) => (
              <div key={dateIndex} className="relative col-span-1">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-[100px] border-t border-gray-200"
                  ></div>
                ))}
                {getEventsForDate(date, false).map((event) => {
                  const { top, height } = getEventPosition(event);

                  const SubjectIcon: LucideIcon | undefined = event.icon
                    ? (lucideIcons[
                        event.icon as keyof typeof lucideIcons
                      ] as LucideIcon)
                    : undefined;

                  if (!SubjectIcon) {
                    console.error(
                      `Icon "${event.icon}" not found in Lucide icons.`,
                    );
                    return null; // Skip rendering if icon not found
                  }

                  return (
                    <TooltipProvider key={event.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`absolute left-0 right-0 bg-${event.color}-100 text-${event.color}-500 overflow-hidden truncate rounded p-1 text-xs ${height < 40 && "flex items-center space-x-2 px-1 py-0"}`}
                            style={{ top: `${top}px`, height: `${height}px` }}
                          >
                            <div className="flex items-center font-semibold">
                              <SubjectIcon className="mr-1 h-4 w-4" />
                              {event.title}
                            </div>
                            <div className="text-xs">
                              {event.start.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              -{" "}
                              {event.end.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            {event.room && (
                              <div className="text-xs">Room: {event.room}</div>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm">{event.description}</p>
                          <p className="text-sm">
                            {event.start.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {event.end.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
