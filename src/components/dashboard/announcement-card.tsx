import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnnouncementCardProps {
    title: string
    content: string
    priority: "low" | "medium" | "high" | "critical"
}

export function AnnouncementCard({ title, content, priority }: AnnouncementCardProps) {
    return (
        <Card className={cn("overflow-hidden transition-all hover:shadow-md bg-theme-gray-light", priority === "high" && "border-l-4 border-theme-red", priority === "medium" && "border-l-4 border-theme-yellow", priority === "low" && "border-l-4 border-theme-gray-lighter",)}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {priority === "high" && <AlertCircle className="h-4 w-4 text-theme-red" />}
                        {priority === "medium" && <AlertTriangle className="h-4 w-4 text-theme-yellow" />}
                        {priority === "low" && <Info className="h-4 w-4 text-theme-gray-lighter" />}
                        <CardTitle className="text-lg">{title}</CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm">{content}</p>
            </CardContent>
        </Card>
    )
}