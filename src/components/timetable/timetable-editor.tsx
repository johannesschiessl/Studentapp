"use client";

import { useState } from "react";
import { TimeTable, TimeTableItem } from "@/types/school-year";
import { Subject } from "@/types/subjects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Plus, X } from "lucide-react";
import { updateTimeTable } from "@/app/actions/school-year";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubjectIcon from "@/components/shared/subject-icon";

interface Props {
  initialTimetable: TimeTable;
  subjects: Subject[];
}

interface EditingLesson extends Omit<TimeTableItem, "subject_id"> {
  subject_id: string;
  editIndex: number;
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const;

const DEFAULT_TIMETABLE: TimeTable = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
};

export function TimetableEditor({ initialTimetable, subjects }: Props) {
  const [timetable, setTimetable] = useState<TimeTable>({
    ...DEFAULT_TIMETABLE,
    ...initialTimetable,
  });
  const [selectedDay, setSelectedDay] =
    useState<(typeof DAYS)[number]>("monday");
  const [editingLesson, setEditingLesson] = useState<EditingLesson | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getSubject = (id: string) =>
    subjects.find((s) => s.id === parseInt(id, 10));

  const handleAddLesson = (day: (typeof DAYS)[number]) => {
    setEditingLesson(null);
    setSelectedDay(day);
    setIsDialogOpen(true);
  };

  const handleEditLesson = (
    day: (typeof DAYS)[number],
    lesson: TimeTableItem,
    editIndex: number,
  ) => {
    setEditingLesson({ ...lesson, editIndex });
    setSelectedDay(day);
    setIsDialogOpen(true);
  };

  const handleSaveLesson = async (formData: FormData) => {
    const newLesson: TimeTableItem = {
      start_time: formData.get("start_time") as string,
      end_time: formData.get("end_time") as string,
      subject_id: formData.get("subject_id") as string,
      room: (formData.get("room") as string) || undefined,
    };

    const updatedTimetable = { ...timetable };
    const dayLessons = [...(updatedTimetable[selectedDay] || [])];

    if (editingLesson) {
      dayLessons[editingLesson.editIndex] = newLesson;
    } else {
      dayLessons.push(newLesson);
    }

    updatedTimetable[selectedDay] = dayLessons;

    try {
      await updateTimeTable(updatedTimetable);
      setTimetable(updatedTimetable);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update timetable:", error);
    }
  };

  const handleRemoveLesson = async (
    day: (typeof DAYS)[number],
    index: number,
  ) => {
    const updatedTimetable = { ...timetable };
    const dayLessons = [...(updatedTimetable[day] || [])];
    dayLessons.splice(index, 1);
    updatedTimetable[day] = dayLessons;

    try {
      await updateTimeTable(updatedTimetable);
      setTimetable(updatedTimetable);
    } catch (error) {
      console.error("Failed to remove lesson:", error);
    }
  };

  return (
    <div>
      <Tabs defaultValue="monday" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-5">
          {DAYS.map((day) => (
            <TabsTrigger key={day} value={day} className="capitalize">
              {day}
            </TabsTrigger>
          ))}
        </TabsList>

        {DAYS.map((day) => (
          <TabsContent key={day} value={day}>
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold capitalize">{day}</h3>
                <Button onClick={() => handleAddLesson(day)} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lesson
                </Button>
              </div>

              <div className="space-y-2">
                {(timetable[day] || []).map((lesson, index) => {
                  const subject = getSubject(lesson.subject_id);
                  return (
                    <div
                      key={`${day}-${index}`}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-4">
                        {subject && (
                          <SubjectIcon
                            icon={subject.icon}
                            color={subject.color}
                            size="default"
                          />
                        )}
                        <div className="text-sm">
                          {lesson.start_time} - {lesson.end_time}
                        </div>
                        <div className="font-medium">
                          {subject ? subject.name : "Unknown Subject"}
                        </div>
                        {lesson.room && (
                          <div className="text-sm text-muted-foreground">
                            Room: {lesson.room}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditLesson(day, lesson, index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveLesson(day, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}

                {(!timetable[day] || timetable[day].length === 0) && (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      No lessons scheduled for this day
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => handleAddLesson(day)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Lesson
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingLesson ? "Edit Lesson" : "Add New Lesson"}
            </DialogTitle>
          </DialogHeader>

          <form
            action={(formData) => {
              handleSaveLesson(formData);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_time">Start Time</Label>
                <Input
                  id="start_time"
                  name="start_time"
                  type="time"
                  defaultValue={editingLesson?.start_time}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_time">End Time</Label>
                <Input
                  id="end_time"
                  name="end_time"
                  type="time"
                  defaultValue={editingLesson?.end_time}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject_id">Subject</Label>
              <Select
                name="subject_id"
                defaultValue={editingLesson?.subject_id}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      <div className="flex items-center">
                        <div
                          className={`mr-2 h-4 w-4 rounded bg-${subject.color}-500`}
                          aria-hidden="true"
                        />
                        <span>{subject.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Room (Optional)</Label>
              <Input id="room" name="room" defaultValue={editingLesson?.room} />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingLesson ? "Save Changes" : "Add Lesson"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
