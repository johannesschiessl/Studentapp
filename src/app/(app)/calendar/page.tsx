import DayView from "@/components/calendar/day-view";
import WeekView from "@/components/calendar/week-view";
import { Event } from "@/types/calendar";

const events: Event[] = []; // TODO: Fetch events from DB

export default function CalendarPage() {
  return (
    <main>
      <div className="hidden sm:block">
        <WeekView events={events} />
      </div>
      <div className="sm:hidden">
        <DayView events={events} />
      </div>
    </main>
  );
}
