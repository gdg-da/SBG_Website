import { BookOpen, Calendar, ClipboardList, Users } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: string
}

export function StatCard({ title, value, icon }: StatCardProps) {
  const IconComponent = () => {
    switch (icon) {
      case "Users":
        return <Users className="h-5 w-5 text-theme-red" />
      case "ClipboardList":
        return <ClipboardList className="h-5 w-5 text-theme-yellow" />
      case "BookOpen":
        return <BookOpen className="h-5 w-5 text-theme-red" />
      case "Calendar":
        return <Calendar className="h-5 w-5 text-theme-yellow" />
      default:
        return <Users className="h-5 w-5 text-theme-red" />
    }
  }

  return (
    <div className="flex items-center justify-between rounded-xl bg-black/40 p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-gray-light">
          <IconComponent />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
