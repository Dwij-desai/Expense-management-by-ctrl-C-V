import { useState } from "react";
import { ChartCard } from "../components/ChartCard";
import { StatsCard } from "../components/StatsCard";
import {
  Calendar,
  Users,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
  Check,
  CalendarDays,
  CalendarClock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { mockUsers } from "../data/mockData";

// Types for calendar events
type EventStatus = "planned" | "confirmed" | "canceled" | "completed";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  organizer: string;
  attendees: string[];
  status: EventStatus;
}

// Mock calendar events data
const mockEvents: CalendarEvent[] = [
  {
    id: "evt1",
    title: "Team Expense Review",
    date: "2023-10-25",
    time: "10:00",
    duration: "1h",
    organizer: "usr2",
    attendees: ["usr1", "usr3", "usr4"],
    status: "confirmed",
  },
  {
    id: "evt2",
    title: "Budget Planning Session",
    date: "2023-10-25",
    time: "14:00",
    duration: "2h",
    organizer: "usr5",
    attendees: ["usr2", "usr6", "usr8"],
    status: "planned",
  },
  {
    id: "evt3",
    title: "Expense Report Deadline",
    date: "2023-10-26",
    time: "17:00",
    duration: "30m",
    organizer: "usr1",
    attendees: ["usr3", "usr4", "usr7"],
    status: "confirmed",
  },
  {
    id: "evt4",
    title: "Finance Team Meeting",
    date: "2023-10-27",
    time: "09:30",
    duration: "1h",
    organizer: "usr2",
    attendees: ["usr5", "usr6", "usr7"],
    status: "confirmed",
  },
  {
    id: "evt5",
    title: "Vendor Payment Review",
    date: "2023-10-27",
    time: "15:00",
    duration: "45m",
    organizer: "usr8",
    attendees: ["usr1", "usr2"],
    status: "planned",
  },
  {
    id: "evt6",
    title: "Monthly Accounting Closure",
    date: "2023-10-31",
    time: "16:00",
    duration: "2h",
    organizer: "usr5",
    attendees: ["usr2", "usr6", "usr8"],
    status: "confirmed",
  },
];

export const TeamCalendarsPage = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    duration: "1h",
    attendees: [] as string[],
  });

  // Get days in month for calendar
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty spaces for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Format date to readable string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  // Navigate to previous or next month
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Check if a date has events
  const hasEvents = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockEvents.some(event => event.date === dateStr);
  };

  // Get events for selected date
  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return mockEvents.filter(event => event.date === dateStr);
  };

  // Get event status style
  const getEventStatusStyle = (status: EventStatus) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'planned':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'canceled':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      case 'completed':
        return 'bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-400';
      default:
        return 'bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-400';
    }
  };

  // Get attendee name
  const getAttendeeName = (id: string) => {
    const user = mockUsers.find(u => u.id === id);
    return user ? user.name : 'Unknown';
  };

  // Handle add event form submission
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New event:', newEvent);
    // In a real app, you would add the event to your events array or database
    alert('Event added successfully!');
    setShowEventModal(false);
  };

  // Count team events by status
  const countEventsByStatus = (status: EventStatus) => {
    return mockEvents.filter(event => event.status === status).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Team Calendars
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            View and manage team events and meetings
          </p>
        </div>
        <button
          onClick={() => setShowEventModal(true)}
          className="flex items-center gap-2 bg-slate-700 dark:bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Events"
          value={mockEvents.length.toString()}
          icon={Calendar}
        />
        <StatsCard
          title="Confirmed Events"
          value={countEventsByStatus('confirmed').toString()}
          icon={Check}
        />
        <StatsCard
          title="Planned Events"
          value={countEventsByStatus('planned').toString()}
          icon={Clock}
        />
        <StatsCard
          title="Team Members"
          value={mockUsers.filter(u => u.status === 'active').length.toString()}
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Team Calendar" subtitle={formatDate(currentDate)}>
            <div className="mb-4 flex justify-between items-center">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                {formatDate(currentDate)}
              </div>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-slate-600 dark:text-slate-400 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square p-1 rounded-lg border ${
                    day
                      ? selectedDate && day.toDateString() === selectedDate.toDateString()
                        ? 'border-slate-500 dark:border-slate-400 bg-slate-100 dark:bg-slate-700'
                        : hasEvents(day)
                        ? 'border-slate-200 dark:border-slate-700 hover:border-slate-500 dark:hover:border-slate-400 cursor-pointer'
                        : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer'
                      : 'border-transparent'
                  }`}
                  onClick={() => day && setSelectedDate(day)}
                >
                  {day && (
                    <div className="h-full w-full flex flex-col">
                      <span
                        className={`text-center text-sm ${
                          hasEvents(day)
                            ? 'font-semibold text-slate-900 dark:text-slate-100'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {day.getDate()}
                      </span>
                      {hasEvents(day) && (
                        <div className="mt-1 flex justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div>
          <ChartCard
            title="Events"
            subtitle={selectedDate ? selectedDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            }) : 'Select a date'}
          >
            <div className="space-y-4">
              {selectedDate ? (
                getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-900 dark:text-slate-100">
                          {event.title}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded ${getEventStatusStyle(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-2">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time} • {event.duration}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">
                          Organizer: {getAttendeeName(event.organizer)}
                        </p>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">
                            Attendees:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {event.attendees.map((attendeeId) => (
                              <span
                                key={attendeeId}
                                className="inline-block text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded"
                              >
                                {getAttendeeName(attendeeId)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarDays className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600 dark:text-slate-400">No events for this date</p>
                    <button
                      onClick={() => setShowEventModal(true)}
                      className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      + Add an event
                    </button>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <CalendarDays className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Select a date to view events
                  </p>
                </div>
              )}
            </div>
          </ChartCard>
        </div>
      </div>

      {showEventModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Add New Event
              </h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                  placeholder="Team Meeting"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Duration
                </label>
                <select
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                >
                  <option value="15m">15 minutes</option>
                  <option value="30m">30 minutes</option>
                  <option value="45m">45 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="1.5h">1.5 hours</option>
                  <option value="2h">2 hours</option>
                  <option value="3h">3 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Attendees
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newEvent.attendees.map((attendeeId) => (
                    <div
                      key={attendeeId}
                      className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded flex items-center gap-1"
                    >
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {getAttendeeName(attendeeId)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setNewEvent({
                          ...newEvent,
                          attendees: newEvent.attendees.filter(id => id !== attendeeId)
                        })}
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                  value=""
                  onChange={(e) => {
                    if (e.target.value && !newEvent.attendees.includes(e.target.value)) {
                      setNewEvent({
                        ...newEvent,
                        attendees: [...newEvent.attendees, e.target.value]
                      });
                    }
                    e.target.value = "";
                  }}
                >
                  <option value="">Select attendees...</option>
                  {mockUsers.filter(u => u.status === 'active').map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-slate-700 dark:bg-slate-600 text-white font-medium py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors"
                >
                  Create Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-6 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium py-2 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
