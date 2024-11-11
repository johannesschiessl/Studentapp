import { Switch } from "../ui/switch";
import * as lucideIcons from "lucide-react";
import { Task } from "@/types/homework";
import { Subject } from "@/types/subjects";
import { FolderClosed, LucideIcon } from "lucide-react";
import EditTaskDialog from "./edit-task-dialog";

export default function TaskCard({
  task,
  toggleDone,
  onEdit,
  onDelete,
  subjects,
}: {
  task: Task;
  toggleDone: (id: number, currentDone: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  subjects: Subject[];
}) {
  const currentSubject = subjects.find(
    (subject) => subject.id === task.subject_id,
  );

  const getSubjectIcon = (): LucideIcon => {
    if (!currentSubject?.icon) return FolderClosed;
    return (
      (lucideIcons[
        currentSubject.icon as keyof typeof lucideIcons
      ] as LucideIcon) || FolderClosed
    );
  };

  const SubjectIcon = getSubjectIcon();

  return (
    <EditTaskDialog
      subjects={subjects}
      task={task}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <div
        key={task.id}
        className="flex w-full cursor-pointer flex-col rounded-[1rem] text-left"
      >
        <div className="flex items-center justify-between rounded-t-[1rem] border-2 bg-neutral-50 p-2 font-medium dark:bg-neutral-900">
          {currentSubject ? (
            <div className="flex items-center">
              <div
                className={`rounded-xl p-2 bg-${currentSubject.color}-100 text-${currentSubject.color}-500 mr-2`}
              >
                <SubjectIcon className="h-5 w-5" />
              </div>
              <p>{currentSubject.name}</p>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="mr-2 rounded-xl bg-neutral-100 p-2">
                <FolderClosed className="h-5 w-5 text-neutral-500" />
              </div>
              <p>General</p>
            </div>
          )}
          <Switch
            checked={task.done}
            onCheckedChange={() => toggleDone(task.id, task.done)}
          />
        </div>

        <div className="rounded-b-[1rem] border-2 border-t-0">
          <div className="flex flex-col space-y-2 p-2">
            <p className="text-lg font-medium">{task.task}</p>
          </div>
        </div>
      </div>
    </EditTaskDialog>
  );
}
