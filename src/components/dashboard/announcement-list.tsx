import { AlertCircle, AlertTriangle, Info } from "lucide-react"

export function AnnouncementList() {
  const announcements = [
    {
      title: "General Meet on May 17",
      priority: "high",
    },
    {
      title: "General Meet Verdict Results out",
      priority: "medium",
    },
    {
      title: "Google Form for queries regarding registration of electives",
      priority: "medium",
    },
    {
      title:
        "Undergraduate Admissions (All India Category), applications deadline extended to 20th June 2025 (Friday).",
      priority: "high",
    },
  ]

  return (
    <ul className="space-y-3">
      {announcements.map((announcement, index) => (
        <li
          key={index}
          className="group relative flex items-start gap-3 rounded-xl bg-black/40 p-3 transition-transform hover:translate-x-1"
        >
          <div className="mt-0.5">
            {announcement.priority === "high" ? (
              <AlertCircle className="h-5 w-5 text-theme-red" />
            ) : announcement.priority === "medium" ? (
              <AlertTriangle className="h-5 w-5 text-theme-yellow" />
            ) : (
              <Info className="h-5 w-5 text-theme-gray-lighter" />
            )}
          </div>
          <div>
            <p className="text-sm">{announcement.title}</p>
          </div>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all duration-300 group-hover:w-full"></div>
        </li>
      ))}
    </ul>
  )
}
