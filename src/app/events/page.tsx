"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { Calendar, momentLocalizer, type View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FuturisticDivider } from "@/components/futuristic-divider"
import { ArrowLeft, ArrowRight, CalendarIcon, Search, Trash2, X } from "lucide-react";
import type { ToolbarProps as RBC_ToolbarProps } from "react-big-calendar";
import { useEvents, deleteEvent } from '@/lib/swr/events_swr';

const localizer = momentLocalizer(moment);

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

const EventComponent = ({ event }: { event: Event }) => (
    <div className="p-2">
        <strong className="text-sm text-ellipsis font-semibold">{event.eventName}</strong>
        <p className="text-xs">{event.location}</p>
    </div>
);

export default function EventsPage() {
    const [view, setView] = useState<View>("month")
    const [mounted, setMounted] = useState(false);
    const [date, setDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { events, isLoading, isError } = useEvents();
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const isAuthorized = user && user.email === process.env.SBG_EMAIL

    const handleNavigate = (newDate: Date) => {
        setDate(newDate);
    };

    const handleViewChange = (newView: View) => {
        setView(newView);
    }

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleDeleteEvent = async () => {
        if (!selectedEvent || !user) return;

        setIsDeleting(true);
        try {
            const idToken = await user.getIdToken();
            await deleteEvent(selectedEvent._id, idToken);
            setSelectedEvent(null);
            alert('Event deleted successfully!');
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (isError) {
        alert("Failed to load events");
    }

    if (!mounted || isLoading) {
        return null;
    }

    const filteredEvents = events.filter((event: Event) => {
        const matchesSearch =
            event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.aboutEvent.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.eventType.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })

    const eventStyleGetter = (event: Event) => {
        let backgroundColor = "#FFBE3F"
        let borderColor = "#FFBE3F"

        switch (event.eventType) {
            case "exam":
                backgroundColor = "#F4503B"
                borderColor = "#F4503B"
                break
            case "workshop":
                backgroundColor = "#FFBE3F"
                borderColor = "#FFBE3F"
                break
            case "meeting":
                backgroundColor = "#F4503B"
                borderColor = "#F4503B"
                break
            case "orientation":
                backgroundColor = "#FFBE3F"
                borderColor = "#FFBE3F"
                break
            case "session":
                backgroundColor = "#F4503B"
                borderColor = "#F4503B"
                break
            case "awareness":
                backgroundColor = "#FFBE3F"
                borderColor = "#FFBE3F"
                break
            case "election":
                backgroundColor = "#F4503B"
                borderColor = "#F4503B"
                break
            case "fest":
                backgroundColor = "#FFBE3F"
                borderColor = "#FFBE3F"
                break
            default:
                backgroundColor = "#F4503B"
                borderColor = "#F4503B"
        }

        return { backgroundColor, borderColor }
    }

    const CustomToolbar: React.FC<RBC_ToolbarProps<Event, object>> = ({ label, onNavigate, onView }) => (
        <div className="mb-6 flex flex-col gap-4 max-sm:ml-2 max-sm:mr-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onNavigate("PREV")}
                        className="rounded-full hover:bg-theme-gray-light"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-bold">{label}</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onNavigate("NEXT")}
                        className="rounded-full hover:bg-theme-gray-light"
                    >
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate("TODAY")}
                    className="rounded-full border-theme-gray-light hover:bg-theme-gray-light"
                >
                    Today
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant={view === "month" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onView("month")}
                    className="rounded-full"
                >
                    Month
                </Button>
                <Button
                    variant={view === "week" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onView("week")}
                    className="rounded-full"
                >
                    Week
                </Button>
                <Button
                    variant={view === "day" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onView("day")}
                    className="rounded-full"
                >
                    Day
                </Button>
                <Button
                    variant={view === "agenda" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onView("agenda")}
                    className="rounded-full"
                >
                    Agenda
                </Button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-background">
            <section className="relative overflow-hidden bg-theme-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] rounded-full bg-theme-red opacity-20 blur-[100px]"></div>
                    <div className="absolute bottom-0 right-0 -z-10 h-[200px] w-[200px] rounded-full bg-theme-yellow opacity-20 blur-[100px]"></div>
                </div>
                <div className="container relative z-10 px-4 py-16 md:px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="inline-flex items-center rounded-full border border-theme-gray-light bg-theme-gray-light/30 px-3 py-1 text-sm backdrop-blur-sm">
                            <CalendarIcon className="mr-2 h-4 w-4 text-theme-red" />
                            Events Calendar
                        </div>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            <span className="bg-gradient-to-r from-white to-theme-gray-lighter bg-clip-text text-transparent">
                                Student
                            </span>{" "}
                            <span className="bg-gradient-to-r from-theme-red to-theme-yellow bg-clip-text text-transparent">
                                Events
                            </span>
                        </h1>
                        <p className="mt-4 text-xl text-muted-foreground">
                            Stay updated with all student government events, meetings, and activities.
                        </p>
                        {isAuthorized && (
                            <p className="mt-2 text-sm text-theme-yellow">
                                As an SBG member, you can click on events to delete them.
                            </p>
                        )}
                    </div>
                </div>
            </section>
            <section className="container px-4 py-12 md:px-6">
                <div className="relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray">
                    <div className="absolute inset-0 bg-gradient-to-br from-theme-red/20 to-theme-yellow/5 opacity-50" />
                    <div className="relative mx-auto max-w-7xl">
                        <div className="w-full flex justify-center items-center gap-6 max-sm:pl-4 max-sm:pr-4">
                            <p className="mt-6 text-xl text-muted-foreground max-sm:hidden">Search Events</p>
                            <div className="relative mt-6 max-w-md">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search events..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 rounded-full border-theme-gray-light bg-theme-gray-light/30 focus-visible:ring-theme-red"
                                />
                            </div>
                        </div>
                        <FuturisticDivider className="my-4" />
                        <div className="pt-4 md:pb-4">
                            <Calendar
                                localizer={localizer}
                                events={filteredEvents}
                                startAccessor="startDate"
                                endAccessor="endDate"
                                style={{ height: 600 }}
                                view={view}
                                onView={handleViewChange}
                                components={{
                                    event: EventComponent,
                                    toolbar: CustomToolbar,
                                }}
                                date={date}
                                onNavigate={handleNavigate}
                                eventPropGetter={(event: Event) => {
                                    return { style: eventStyleGetter(event) };
                                }}
                                onSelectEvent={handleEventClick}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative w-full max-w-3xl rounded-2xl border border-theme-gray-light bg-theme-gray p-6 shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-theme-red/10 to-theme-yellow/5 opacity-50 rounded-2xl" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    {isAuthorized ? "Delete Event" : "Event Details"}
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedEvent(null)}
                                    className="h-8 w-8 rounded-full hover:bg-theme-gray-light"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mb-6">
                                <h1 className="text-xl font-bold text-white mb-2">{selectedEvent.eventName}</h1>
                                <p className="text-sm text-muted-foreground mb-1">
                                    <strong>Type:</strong> {selectedEvent.eventType}
                                </p>
                                <p className="text-sm text-muted-foreground mb-1">
                                    <strong>Location:</strong> {selectedEvent.location}
                                </p>
                                <p className="text-sm text-muted-foreground mb-1">
                                    <strong>Date:</strong> {moment(selectedEvent.startDate).format('MMMM D, YYYY')}
                                </p>
                                <p className="text-sm text-muted-foreground mb-1">
                                    <strong>Hosted by:</strong> {selectedEvent.hostedBy}
                                </p>
                                {selectedEvent.aboutEvent && (
                                    <p className="text-sm text-muted-foreground mb-1">
                                        <strong>About:</strong> {selectedEvent.aboutEvent}
                                    </p>
                                )}
                                {selectedEvent.website && (
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Website:</strong>
                                        <a href={selectedEvent.website} target="_blank" rel="noopener noreferrer" className="text-theme-yellow hover:underline ml-1">
                                            {selectedEvent.website}
                                        </a>
                                    </p>
                                )}
                            </div>
                            {isAuthorized ? (
                                <>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        Are you sure you want to delete this event? This action cannot be undone.
                                    </p>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            onClick={() => setSelectedEvent(null)}
                                            className="flex-1 rounded-full border-theme-gray-light hover:bg-theme-gray-light"
                                            disabled={isDeleting}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={handleDeleteEvent}
                                            className="flex-1 rounded-full bg-red-600 hover:bg-red-700"
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? (
                                                "Deleting..."
                                            ) : (
                                                <>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedEvent(null)}
                                        className="rounded-full border-theme-gray-light hover:bg-theme-gray-light"
                                    >
                                        Close
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}