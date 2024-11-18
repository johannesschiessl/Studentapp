"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubjectIcon from "@/components/shared/subject-icon";
import { TimeTableItem } from "@/types/school-year";
import { format, isToday } from "date-fns";
import { Subject } from "@/types/subjects";
import { useTranslation } from "@/hooks/use-translation";

interface ScheduleCardProps {
  timetable: Record<string, TimeTableItem[]>;
  subjects: Subject[];
}

function getTimeStatus(item: TimeTableItem) {
  const now = new Date();
  const today = new Date(now);
  const [startHour, startMinute] = item.start_time.split(":");
  const [endHour, endMinute] = item.end_time.split(":");

  const startTime = new Date(
    today.setHours(parseInt(startHour), parseInt(startMinute), 0),
  );
  const endTime = new Date(
    today.setHours(parseInt(endHour), parseInt(endMinute), 0),
  );

  const isCurrentLesson = now >= startTime && now <= endTime;
  const minutesToStart = Math.ceil(
    (startTime.getTime() - now.getTime()) / (1000 * 60),
  );

  return { isCurrentLesson, minutesToStart };
}

export default function TimetableCard({
  timetable,
  subjects,
}: ScheduleCardProps) {
  const { t } = useTranslation();
  const now = new Date();
  const dayName = format(now, "EEEE").toLowerCase();

  if (dayName === "saturday" || dayName === "sunday") {
    return null;
  }

  const todaySchedule = timetable[dayName] || [];

  const futureSchedule = todaySchedule.filter((item) => {
    const today = new Date(now);
    const [hour, minute] = item.end_time.split(":");
    const endTime = new Date(
      today.setHours(parseInt(hour), parseInt(minute), 0),
    );
    return endTime > now;
  });

  if (!isToday(now) || futureSchedule.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("home.schedule.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {futureSchedule.map((item, index) => {
              const subject = subjects.find(
                (s) => s.id === parseInt(item.subject_id),
              );
              const { isCurrentLesson, minutesToStart } = getTimeStatus(item);

              if (!subject) return null;

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 rounded-lg border p-4 transition-all ${isCurrentLesson ? "border-2 border-red-600" : ""}`}
                >
                  <SubjectIcon
                    icon={subject.icon}
                    color={subject.color}
                    size="default"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.start_time} - {item.end_time}
                      {item.room
                        ? ` - ${t("home.schedule.room")} ${item.room}`
                        : ` - ${t("home.schedule.room")} ${subject.room}`}
                    </p>
                  </div>
                  {minutesToStart > 0 && (
                    <span className="whitespace-nowrap text-sm text-muted-foreground">
                      in {minutesToStart} min
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
