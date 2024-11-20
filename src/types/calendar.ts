export interface Event {
  id: number;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  room?: string;
  isAllDay: boolean;
  color: string;
  icon?: string;
}

export interface Holiday {
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
  icon: keyof typeof import("lucide-react");
}
