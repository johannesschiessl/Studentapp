"use client";

import { Task } from "@/types/homework";
import { Subject } from "@/types/subjects";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Circle, CircleCheck, ListChecks } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import {
  addTask,
  deleteTask,
  editTask,
  toggleTaskDone,
} from "@/app/actions/homework";
import TaskList from "./task-list";
import { Button } from "../ui/button";
import AddHomeworkDialog from "./add-task-dialog";

interface HomeworkContentProps {
  initalHomework: Task[];
  subjects: Subject[];
  schoolYearId: number;
}

export function HomeworkContent({
  initalHomework,
  subjects,
  schoolYearId,
}: HomeworkContentProps) {
  const [homework, setHomework] = useState<Task[]>(initalHomework);

  const { t } = useTranslation();

  const pendingHomework = homework.filter((hw) => !hw.done);
  const doneHomework = homework.filter((hw) => hw.done);

  function toggleDone(id: number, currentDone: boolean) {
    toggleTaskDone(id, currentDone);
    setHomework((prev) => {
      return prev.map((hw) => {
        if (hw.id === id) {
          return {
            ...hw,
            done: !currentDone,
          };
        }
        return hw;
      });
    });
  }

  async function handleAddTask(task: Omit<Task, "id">) {
    try {
      const newTask = await addTask(task);
      if (newTask) {
        setHomework((prev) => [...prev, newTask as Task]);
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }

  function handleEditTask(task: Task) {
    editTask(task);
    setHomework((prev) => prev.map((hw) => (hw.id === task.id ? task : hw)));
  }

  function handleDeleteTask(id: number) {
    deleteTask(id);
    setHomework((prev) => prev.filter((hw) => hw.id !== id));
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">{t("homeworks")}</h1>
        <AddHomeworkDialog
          subjects={subjects}
          onAdd={handleAddTask}
          schoolYearId={schoolYearId}
        >
          <Button>{t("homework.add")}</Button>
        </AddHomeworkDialog>
      </div>

      <Tabs defaultValue="open" className="mx-auto mt-4">
        <TabsList className="w-full">
          <TabsTrigger value="open" className="w-1/3">
            <Circle className="mr-2 h-4 w-4" />
            {t("homework.open")}
          </TabsTrigger>
          <TabsTrigger value="completed" className="w-1/3">
            <CircleCheck className="mr-2 h-4 w-4" />
            {t("homework.completed")}
          </TabsTrigger>
          <TabsTrigger value="all" className="w-1/3">
            <ListChecks className="mr-2 h-4 w-4" />
            {t("homework.all")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="mt-5 w-full">
          <TaskList
            subjects={subjects}
            toogleDone={(id, currentDone) => toggleDone(id, currentDone)}
            onEdit={(task) => handleEditTask(task)}
            onDelete={(id) => handleDeleteTask(id)}
            tasks={pendingHomework}
            category="open"
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-5 w-full">
          <TaskList
            subjects={subjects}
            toogleDone={(id, currentDone) => toggleDone(id, currentDone)}
            onEdit={(task) => handleEditTask(task)}
            onDelete={(id) => handleDeleteTask(id)}
            tasks={doneHomework}
            category="completed"
          />
        </TabsContent>

        <TabsContent value="all" className="mt-5 w-full">
          <TaskList
            subjects={subjects}
            toogleDone={(id, currentDone) => toggleDone(id, currentDone)}
            onEdit={(task) => handleEditTask(task)}
            onDelete={(id) => handleDeleteTask(id)}
            tasks={homework}
            category="all"
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
