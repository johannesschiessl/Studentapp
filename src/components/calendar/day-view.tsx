"use client";

import React, { useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as lucideIcons from "lucide-react";
import { Event } from "@/types/calendar";
import { TimeTable } from "@/types/school-year";
import { isHoliday } from "@/constants/holidays";
import { cn } from "@/lib/utils";
import { transformTimetableToEvents } from "@/app/actions/calendar";
import { useTranslation } from "@/hooks/use-translation";

import { LucideIcon } from "lucide-react";
const hours = Array.from({ length: 14 }, (_, i) => i + 7);

interface DayViewProps {
  events: Event[];
  timetableEvents: Event[];
  initialDate: Date;
  timetable: TimeTable;
}

export default function DayView({
  events,
  timetableEvents,
  initialDate,
  timetable,
}: DayViewProps) {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentTimetableEvents, setCurrentTimetableEvents] =
    useState(timetableEvents);

  // When date changes, transform timetable events synchronously
  useEffect(() => {
    async function updateTimetableEvents() {
      const newEvents = await transformTimetableToEvents(
        currentDate,
        timetable,
      );
      setCurrentTimetableEvents(newEvents);
    }

    if (currentDate.getTime() !== initialDate.getTime()) {
      updateTimetableEvents();
    }
  }, [currentDate, initialDate, timetable]);

  const changeDate = (increment: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + increment);
      return newDate;
    });
  };

  const getEventsForDate = (date: Date, allDay: boolean) => {
    return [...events, ...currentTimetableEvents].filter(
      (event) =>
        event.start.getDate() === date.getDate() &&
        event.start.getMonth() === date.getMonth() &&
        event.start.getFullYear() === date.getFullYear() &&
        event.isAllDay === allDay,
    );
  };

  const getEventPosition = (event: Event) => {
    const startHour = event.start.getHours() + event.start.getMinutes() / 60;
    const endHour = event.end.getHours() + event.end.getMinutes() / 60;
    const top = (startHour - 7) * 100;
    const height = (endHour - startHour) * 100;
    return { top, height };
  };

  const holiday = isHoliday(currentDate);

  return (
    <div>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Button variant="outline" size="icon" onClick={() => changeDate(-1)}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{t("calendar.previous_day")}</span>
        </Button>
        <h1 className="text-md font-bold sm:text-2xl">
          {currentDate.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h1>
        <Button variant="outline" size="icon" onClick={() => changeDate(1)}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">{t("calendar.next_day")}</span>
        </Button>
      </div>
      <div>
        <div className="space-y-4">
          {/* All-day events section */}
          <div>
            <h3 className="mb-2 font-semibold">{t("calendar.all_day")}</h3>
            <div className="space-y-1">
              {getEventsForDate(currentDate, true).map((event) => (
                <TooltipProvider key={event.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`bg-${event.color}-100 text-${event.color}-500 rounded p-2 text-sm`}
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
          </div>

          {/* Timetable events section */}
          <div className="relative">
            {hours.map((hour) => (
              <div key={hour} className="flex">
                <div className="w-16 pr-6 text-right text-sm sm:pr-4">
                  {hour}:00
                </div>
                <div className="h-[100px] flex-grow border-t border-gray-200"></div>
              </div>
            ))}
            {holiday ? (
              <div
                className={cn(
                  "justify-top absolute inset-0 flex flex-col items-center rounded-xl pt-32",
                  `bg-${holiday.color}-100 text-${holiday.color}-500`,
                )}
              >
                {(() => {
                  const Icon = lucideIcons[
                    holiday.icon as keyof typeof lucideIcons
                  ] as LucideIcon;
                  return (
                    <>
                      <Icon className={`h-12 w-12`} />
                      <span
                        className={`mt-4 text-xl font-semibold text-${holiday.color}-700`}
                      >
                        {holiday.name}
                      </span>
                    </>
                  );
                })()}
              </div>
            ) : (
              getEventsForDate(currentDate, false).map((event) => {
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
                          className={`absolute left-16 right-0 bg-${event.color}-100 text-${event.color}-500 overflow-hidden rounded p-2 text-sm ${height < 40 && "flex items-center space-x-2 px-2 py-0"}`}
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
                            })}
                            -
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
                          })}
                          -
                          {event.end.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
