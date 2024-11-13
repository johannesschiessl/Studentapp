import { Task } from "@/types/homework";
import TaskCard from "./task-card";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CalendarCheck,
  CalendarClock,
} from "lucide-react";
import {
  differenceInCalendarDays,
  isAfter,
  isBefore,
  isToday,
  isTomorrow,
  parseISO,
  startOfDay,
  endOfDay,
} from "date-fns";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Subject } from "@/types/subjects";

export default function TaskList({
  tasks,
  toogleDone,
  onEdit,
  onDelete,
  subjects,
  category,
}: {
  tasks: Task[];
  toogleDone: (id: number, currentDone: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  subjects: Subject[];
  category: "open" | "completed" | "all";
}) {
  const groupedTasks = tasks.reduce(
    (acc, task) => {
      const dueDate =
        task.due_date instanceof Date
          ? task.due_date
          : parseISO(task.due_date as string);
      const dateKey = dueDate.toISOString().split("T")[0];

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push({
        ...task,
        due_date: dueDate,
      });
      return acc;
    },
    {} as Record<string, Task[]>,
  );

  const sortedDates = Object.keys(groupedTasks).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  const taskListParent = useRef(null);

  useEffect(() => {
    taskListParent.current && autoAnimate(taskListParent.current);
  }, [taskListParent]);

  const { t } = useTranslation();

  return (
    <div ref={taskListParent} className="space-y-5">
      {sortedDates.length > 0 ? (
        sortedDates.map((date) => (
          <div key={date} className="space-y-5">
            {category === "open" && <OpenDayHeader date={date} />}
            {category === "completed" && <CompletedDayHeader date={date} />}
            {category === "all" && <AllDayHeader date={date} />}
            <div className="space-y-2 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
              {groupedTasks[date].map((task) => (
                <TaskCard
                  toggleDone={(id, currentDone) => toogleDone(id, currentDone)}
                  onEdit={(task) => onEdit(task)}
                  onDelete={(id) => onDelete(id)}
                  key={task.id}
                  task={task}
                  subjects={subjects}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="py-10">
          {category === "open" ? (
            <p className="text-center text-gray-500">
              {t("homework.no_tasks.open")}
            </p>
          ) : (
            <p className="text-center text-gray-500">
              {t("homework.no_tasks")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function OpenDayHeader({ date }: { date: string }) {
  const { color, icon, note } = getDayProps(date.toString());

  return (
    <div
      className={`flex w-full items-center bg-${color}-100 text-${color}-500 rounded-xl p-2`}
    >
      <div className="flex items-center space-x-2">
        {icon}
        <span>{new Date(date).toLocaleDateString()}</span>
        <span>{note}</span>
      </div>
    </div>
  );
}

function CompletedDayHeader({ date }: { date: string }) {
  return (
    <div
      className={`flex w-full items-center rounded-xl bg-green-100 p-2 text-green-500`}
    >
      <div className="flex items-center space-x-2">
        <CalendarCheck className="h-5 w-5" />
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

function AllDayHeader({ date }: { date: string }) {
  return (
    <div
      className={`flex w-full items-center rounded-xl bg-neutral-100 p-2 text-neutral-500`}
    >
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5" />
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

function getDayProps(date: string) {
  if (!date) {
    return {
      color: "neutral",
      icon: <Calendar className="mr-2 h-5 w-5" />,
      note: "Due date not set",
    };
  }

  const now = startOfDay(new Date());
  const dueDateParsed = startOfDay(new Date(date));
  const isDueToday = isToday(dueDateParsed);
  const isDueTomorrow = isTomorrow(dueDateParsed);
  const daysUntilDue = differenceInCalendarDays(dueDateParsed, now);

  if (isDueToday) {
    return {
      color: "red",
      icon: <AlertCircle className="h-5 w-5" />,
      note: "Due today!",
    };
  } else if (isBefore(dueDateParsed, now)) {
    return {
      color: "red",
      icon: <AlertCircle className="h-5 w-5" />,
      note: `These tasks are ${-daysUntilDue} ${
        -daysUntilDue === 1 ? "day" : "days"
      } overdue!`,
    };
  } else if (
    isDueTomorrow &&
    isAfter(new Date(), endOfDay(now).setHours(18, 0, 0))
  ) {
    return {
      color: "orange",
      icon: <AlertTriangle className="h-5 w-5" />,
      note: "Due tomorrow. Not much time left!",
    };
  } else if (isDueTomorrow) {
    return {
      color: "blue",
      icon: <CalendarClock className="h-5 w-5" />,
      note: "Due tomorrow.",
    };
  } else if (daysUntilDue > 1) {
    return {
      color: "green",
      icon: <Calendar className="h-5 w-5" />,
      note: `Due in ${daysUntilDue} days.`,
    };
  } else {
    return {
      color: "neutral",
      icon: <Calendar className="h-5 w-5" />,
      note: "Due soon.",
    };
  }
}
