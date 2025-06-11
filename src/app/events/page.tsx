"use client";

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Clock, Users } from "lucide-react";

// Setup the localizer
const localizer = momentLocalizer(moment);

// Define the Event type
interface Event {
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
}

// Custom Event component
const EventComponent = ({ event }: { event: Event }) => (
  <div className="p-2">
    <strong className="text-sm font-semibold">{event.eventName}</strong>
    <p className="text-xs text-gray-300">{event.location}</p>
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
          const formattedEvents = value.map((event: Event) => ({
            ...event,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
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

  // Get upcoming events (next 7 days)
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.startDate);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= nextWeek;
  });

  // Apply custom styles based on theme
  const calendarStyles = {
    height: "100%",
    backgroundColor: "transparent",
    ...(theme === "dark"
      ? {
          "--cal-bg": "transparent",
          "--cal-header-bg": "transparent",
          "--cal-header-color": "#fff",
          "--cal-cell-color": "#fff",
          "--cal-border-color": "rgba(255, 255, 255, 0.1)",
        } as React.CSSProperties
      : {}),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-emerald-500/20 z-0" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Campus <span className="text-emerald-400">Events</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Stay updated with all the exciting events happening across campus. From workshops to cultural festivals, find your next opportunity to learn and grow.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-blue-900/30 border-blue-800 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="text-emerald-400" />
                    Event Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: "600px" }} className="calendar-container">
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
                        let backgroundColor = "#3174ad";
                        if (event.eventType === "exam") backgroundColor = "#d32f2f";
                        if (event.eventType === "session") backgroundColor = "#388e3c";
                        return { 
                          style: { 
                            backgroundColor,
                            border: "none",
                            borderRadius: "4px",
                            opacity: 0.9,
                          } 
                        };
                      }}
                      date={date}
                      onNavigate={handleNavigate}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Upcoming Events Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-blue-900/30 border-blue-800 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="text-emerald-400" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <motion.div
                        key={event._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-blue-900/20 border-blue-800/50 hover:bg-blue-900/30 transition-colors">
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-emerald-400 mb-2">{event.eventName}</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                              <p className="flex items-center gap-2">
                                <MapPin size={16} />
                                {event.location}
                              </p>
                              <p className="flex items-center gap-2">
                                <CalendarIcon size={16} />
                                {new Date(event.startDate).toLocaleDateString()}
                              </p>
                              <p className="flex items-center gap-2">
                                <Users size={16} />
                                {event.hostedBy}
                              </p>
                            </div>
                            {event.website && (
                              <Link href={event.website} target="_blank" rel="noopener noreferrer">
                                <Button variant="link" className="text-emerald-400 p-0 h-auto mt-2">
                                  Learn More
                                </Button>
                              </Link>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Event Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <Card className="bg-blue-900/30 border-blue-800 text-white">
                <CardHeader>
                  <CardTitle>Event Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#3174ad] rounded mr-3"></div>
                      <span>Club Events</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#d32f2f] rounded mr-3"></div>
                      <span>Exams</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#388e3c] rounded mr-3"></div>
                      <span>Sessions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}