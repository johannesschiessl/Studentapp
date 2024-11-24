export interface Exam {
  id: number;
  exam_type_id: number;
  grade?: number;
  grade_modifier?: "+" | "-" | "none";
  date_written: Date;
  date_returned?: Date;
  description?: string;
  subject_id: number;
  school_year_id?: number;
}

export interface ExamType {
  id: string;
  name: string;
  weight: number;
  group_id: string;
}

export interface ExamTypeGroup {
  id: string;
  name: string;
  weight: number;
}

export type NewExamType = Omit<ExamType, "id">;
export type NewExamTypeGroup = Omit<ExamTypeGroup, "id">;

export type NewExam = Omit<Exam, "id" | "subject_id">;
