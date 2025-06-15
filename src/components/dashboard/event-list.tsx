import { CalendarDays, Clock, MapPin } from "lucide-react"

export function EventsList() {
  const events = [
    {
      title: "Student Leadership Workshop",
      date: "June 22, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Leadership Center",
    },
    {
      title: "Campus Improvement Forum",
      date: "June 24, 2025",
      time: "4:00 PM - 6:00 PM",
      location: "Student Center, Room 101",
    },
    {
      title: "Budget Allocation Meeting",
      date: "June 26, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Admin Building, Room 204",
    },
  ]

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-xl bg-black/40 p-4 transition-all hover:bg-black/60"
        >
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-theme-red opacity-5 transition-transform group-hover:scale-150"></div>
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-theme-yellow opacity-5 transition-transform group-hover:scale-150"></div>

          <h3 className="mb-2 font-bold">{event.title}</h3>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-theme-red" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-theme-yellow" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-theme-red" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all duration-300 group-hover:w-full"></div>
        </div>
      ))}
    </div>
  )
}
