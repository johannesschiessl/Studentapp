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
import { getSubject } from "@/app/actions/subjects";
import { getTimeTable } from "@/app/actions/school-year";
const hours = Array.from({ length: 14 }, (_, i) => i + 7);

export default function DayView({ events }: { events: Event[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timetable, setTimetable] = useState<any>(null);
  const [transformedEvents, setTransformedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      const timetable = await getTimeTable();
      setTimetable(timetable);
    };
    fetchTimetable();
  }, []);

  const transformTimetableToEvents = async (
    date: Date,
    timetable: any,
  ): Promise<Event[]> => {
    const dayName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const timetableItems = timetable[dayName] || [];

    const transformedItems = await Promise.all(
      timetableItems
        .filter((item) => item.start_time && item.end_time)
        .map(async (item) => {
          const [startHour, startMinute] = item.start_time
            .split(":")
            .map(Number);
          const [endHour, endMinute] = item.end_time.split(":").map(Number);
          const start = new Date(date);
          start.setHours(startHour, startMinute);

          const end = new Date(date);
          end.setHours(endHour, endMinute);

          const subject = await getSubject(item.subject_id);
          return {
            title: `${subject.name}`,
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
        const dayEvents = await transformTimetableToEvents(
          currentDate,
          timetable,
        );
        setTransformedEvents(dayEvents);
      }
    };

    fetchTransformedEvents();
  }, [currentDate, timetable]);

  const changeDate = (increment: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + increment);
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

  return (
    <div>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Button variant="outline" size="icon" onClick={() => changeDate(-1)}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous day</span>
        </Button>
        <h1 className="text-md font-bold sm:text-2xl">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h1>
        <Button variant="outline" size="icon" onClick={() => changeDate(1)}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next day</span>
        </Button>
      </div>
      <div>
        <div className="space-y-4">
          {/* All-day events section */}
          <div>
            <h3 className="mb-2 font-semibold">All-day Events</h3>
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
            {getEventsForDate(currentDate, false).map((event) => {
              const { top, height } = getEventPosition(event);

              const SubjectIcon =
                lucideIcons[event.icon as keyof typeof lucideIcons];

              if (!SubjectIcon) {
                console.error(
                  `Icon "${event.icon}" not found in Lucide icons.`,
                );
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
