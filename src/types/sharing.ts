export type SharedItemType = "subject" | "exam" | "homework";

// Define types for exam and homework shared data
export interface SharedExam {
  title: string;
  date: string;
  subject: string;
  type: string;
}

export interface SharedHomework {
  title: string;
  dueDate: string;
  subject: string;
  description?: string;
}

export interface SharedItem {
  id: string;
  created_at: string;
  user_id: string;
  type: SharedItemType;
  data: SharedSubject[] | SharedExam[] | SharedHomework[];
  title: string;
  description?: string;
  active: boolean;
}

export interface SubjectShareData
  extends Pick<
    import("./subjects").Subject,
    "name" | "teacher" | "room" | "color" | "icon"
  > {}

export interface ShareSubjectsRequest {
  subjects: number[];
  title: string;
  description?: string;
}

export interface ImportSharedSubjectsRequest {
  sharedItemId: string;
  schoolYearId: number;
}

export interface SharedSubject {
  name: string;
  icon: string;
  color: string;
  teacher?: string;
}
