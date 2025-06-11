"use client";

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";

// Setup the localizer
const localizer = momentLocalizer(moment);

// Define the Event type
interface Event {
  _id: string;
  eventName: string;
  aboutEvent: string;
  eventType: string; // Use eventType, not type
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
}

// Custom Event component
const EventComponent = ({ event }: { event: Event }) => (
  <div>
    <strong>{event.eventName}</strong>
    <p>{event.location}</p>
    <Link href={event.website ?? ""} target="_blank" rel="noopener noreferrer">
      <Button variant="link" size="sm">{event.aboutEvent}</Button>
    </Link>
  </div>
);

export default function EventsPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [date, setDate] = useState(new Date());

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  // Fetch events on mount
  useEffect(() => {
    setMounted(true);
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events", { method: "GET" });
        if (response.ok) {
          const value = await response.json();
          // Map API response to match Event type
          const formattedEvents = value.map((event: Event) => ({
            ...event,
            startDate: new Date(event.startDate), // Convert to Date
            endDate: new Date(event.endDate), // Convert to Date
          }));
          setEvents(formattedEvents);
        //   console.log("Events:", formattedEvents);
        } else {
          alert("Failed to load events");
        }
      } catch (error) {
        console.error("Error Loading Event Page:", error);
      }
    };
    fetchEvents();
  }, []);

  if (!mounted) {
    return null;
  }

  // Apply custom styles based on theme
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
  };

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
              eventPropGetter={(event: Event) => {
                let backgroundColor = "#3174ad"; // Default
                if (event.eventType === "exam") backgroundColor = "#d32f2f"; // Use eventType
                if (event.eventType === "session") backgroundColor = "#388e3c";
                return { style: { backgroundColor } };
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
  );
}