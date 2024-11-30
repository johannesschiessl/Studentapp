export interface Subject {
  id: number;
  name: string;
  teacher?: string;
  room?: string;
  color: string;
  icon: string;
  favorite?: boolean;
  average_grade?: number;
  school_year_id?: number;
}

export interface SubjectCreateInput {
  name: string;
  teacher?: string;
  room?: string;
  color: string;
  icon: string;
  user_id: string;
  school_year_id: number;
}
