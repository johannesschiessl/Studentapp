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
