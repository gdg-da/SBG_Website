import { useEffect, useState } from "react"
import { CalendarDays, MapPin } from "lucide-react"

type Event = {
    eventName: string;
    startDate: string;
    endDate: string;
    hostedBy: string;
    location: string;
}

export function EventsList() {
    const [eventData, setEventData] = useState<Event[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');

                const data = await response.json();
                setEventData(data);
            } catch {
                //handle error
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {eventData && eventData.length > 0 ? (
                [...eventData].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map((event, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-xl bg-black/40 p-4 transition-all hover:bg-black/60">
                        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-theme-red opacity-5 transition-transform group-hover:scale-150"></div>
                        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-theme-yellow opacity-5 transition-transform group-hover:scale-150"></div>
                        <h3 className="mb-2 font-bold">{event.eventName}</h3>
                        <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-theme-red" />
                                <span>{event.startDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-theme-red" />
                                <span>{event.location}</span>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all duration-300 group-hover:w-full"></div>
                    </div>
                ))
            ) : (
                <div className="text-center text-muted-foreground">
                    No events available at the moment.
                </div>
            )}
        </div>
    )
}