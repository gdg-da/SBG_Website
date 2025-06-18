import { CalendarDays, MapPin } from "lucide-react";
import { useEvents } from "@/lib/swr/events_swr";
import type { Event } from "@/lib/swr/events_swr";

export function EventsList() {
    const { events, isLoading, isError } = useEvents();

    if (isError) {
        return (
            <div className="group relative flex items-start gap-3 rounded-xl bg-black/40 p-3 transition-transform hover:translate-x-1">
                <p className="text-sm text-red-400">Failed to load events.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
            </div>
        );
    }

    const upcomingEvents: Event[] = (events ?? [])
        .filter((event: Event) => new Date(event.startDate).getTime() >= Date.now())
        .sort((a: Event, b: Event) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, 5);

    if (upcomingEvents.length === 0) {
        return (
            <div className="group relative flex items-start gap-3 rounded-xl bg-black/40 p-3 transition-transform hover:translate-x-1">
                <p className="text-sm">No upcoming events available.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {upcomingEvents.map((event: Event) => (
                <div key={event.eventName + new Date(event.startDate).toISOString()} className="group relative overflow-hidden rounded-xl bg-black/40 p-4 transition-all hover:bg-black/60">
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-theme-red opacity-5 transition-transform group-hover:scale-150"></div>
                    <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-theme-yellow opacity-5 transition-transform group-hover:scale-150"></div>
                    <h3 className="mb-2 font-bold">{event.eventName}</h3>
                    <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-theme-red" />
                            <span>{new Date(event.startDate).toDateString()}</span>
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
    );
}