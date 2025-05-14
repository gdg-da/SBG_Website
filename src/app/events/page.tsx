"use client"

import React, { useEffect, useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"

const localizer = momentLocalizer(moment);

type Event = {
  _id: string;
  eventName: string;
  aboutEvent: string;
  eventType: string;
  location: string;
  startDate: string; 
  endDate: string;   
  hostedBy: string;
  hostEmail: string;
  bannerUrl: string;
  eventPictures: string;
  website: string | null;
  createdAt: string; 
  updatedAt: string;
  __v: number;
};
// let events = [];

const EventComponent = ({ event }: { event: Event }) => (
    <div>
        <strong>{event.eventName}</strong>
        <p>{event.location}</p>
        <Link href={event.website??""} target="_blank" rel="noopener noreferrer">
            <Button variant="link" size="sm">
                {event.aboutEvent}
            </Button>
        </Link>
    </div>
)

export default function EventsPage() {
    const { theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());

    const handleNavigate = (newDate: Date) => {
        setDate(newDate);
    };

    // Ensure we only access theme on the client side
    useEffect(() => {
        setMounted(true)
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/events", {
                    method: "GET"
                });

                if (response.ok) {
                    response.json().then(value=>{
                        setEvents(value);
                        console.log("Events:", value);
                    });
                } else {
                    alert("Failed to load events");
                }
            } catch (error) {
                console.error("Error Loading Event Page:", error);
            }
        }
        fetchEvents();
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
                            startAccessor="startDate"
                            endAccessor="endDate"
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
                            date={date}
                            onNavigate={handleNavigate}
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