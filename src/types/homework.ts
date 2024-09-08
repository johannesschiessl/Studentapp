export interface Task {
  id: number;
  task: string;
  done: boolean;
  due_date: Date;
  subject_id?: number | null | "null";
  school_year_id: number;
}
