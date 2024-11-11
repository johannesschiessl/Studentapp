export interface SchoolYear {
  îd: number;
  class: number;
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
  saturday: TimeTableItem[];
  sunday: TimeTableItem[];
  [key: string]: TimeTableItem[]; // Index signature for dynamic access
}
