"use client"

import React, { useEffect } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format } from "date-fns"
import { parse } from "date-fns/parse"
import { startOfWeek } from "date-fns/startOfWeek"
import { getDay } from "date-fns/getDay"
import { enUS } from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"

const locales = {
    "en-US": enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

// Dummy data for events
const events = [
    {
        id: 1,
        title: "Annual Debate Competition",
        start: new Date(2023, 5, 15),
        end: new Date(2023, 5, 15),
        allDay: true,
        location: "Main Auditorium",
        website: "https://example.com/debate-competition",
        type: "club",
    },
    {
        id: 2,
        title: "Final Exams",
        start: new Date(2023, 5, 20),
        end: new Date(2023, 5, 30),
        allDay: true,
        location: "Examination Halls",
        website: "https://example.com/final-exams",
        type: "exam",
    },
    {
        id: 3,
        title: "Robotics Workshop",
        start: new Date(2023, 6, 5, 10, 0),
        end: new Date(2023, 6, 5, 16, 0),
        location: "Engineering Building, Room 101",
        website: "https://example.com/robotics-workshop",
        type: "club",
    },
    {
        id: 4,
        title: "Guest Lecture: AI in Healthcare",
        start: new Date(2023, 6, 10, 14, 0),
        end: new Date(2023, 6, 10, 16, 0),
        location: "Science Center Auditorium",
        website: "https://example.com/ai-healthcare-lecture",
        type: "session",
    },
]

const EventComponent = ({ event }: { event: any }) => (
    <div>
        <strong>{event.title}</strong>
        <p>{event.location}</p>
        <Link href={event.website} target="_blank" rel="noopener noreferrer">
            <Button variant="link" size="sm">
                Event Details
            </Button>
        </Link>
    </div>
)

export default function EventsPage() {
    const { theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Ensure we only access theme on the client side
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    // Apply custom styles to the calendar based on the theme
    const calendarStyles = {
        height: "100%",
        ...(theme === "dark"
            ? ({
                "--cal-bg": "var(--background)",
                "--cal-header-bg": "var(--card)",
                "--cal-header-color": "var(--foreground)",
                "--cal-cell-color": "var(--foreground)",
                "--cal-border-color": "var(--border)",
            } as React.CSSProperties)
            : {}),
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Events Calendar</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <div style={{ height: "500px" }} className="calendar-container">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={calendarStyles}
                            components={{
                                event: EventComponent,
                            }}
                            eventPropGetter={(event) => {
                                let backgroundColor = "#3174ad"
                                if (event.type === "exam") backgroundColor = "#d32f2f"
                                if (event.type === "session") backgroundColor = "#388e3c"
                                return { style: { backgroundColor } }
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Event Legend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-[#3174ad] mr-2"></div>
                            <span>Club Events</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-[#d32f2f] mr-2"></div>
                            <span>Exams</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-[#388e3c] mr-2"></div>
                            <span>Sessions</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}