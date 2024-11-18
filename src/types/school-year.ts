export interface SchoolYear {
  id: number;
  class: number;
  grading_system: string;
  vacation_region: string;
  timetable: TimeTable;
  user_id: string;
  created_at?: string;
}

export interface TimeTableItem {
  start_time: string;
  end_time: string;
  subject_id: string;
  room?: string;
}

export interface TimeTable {
  monday: TimeTableItem[];
  tuesday: TimeTableItem[];
  wednesday: TimeTableItem[];
  thursday: TimeTableItem[];
  friday: TimeTableItem[];
  [key: string]: TimeTableItem[];
}
