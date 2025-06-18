import useSWR, { mutate } from 'swr';

export type Event = {
    eventName: string;
    startDate: string;
    endDate: string;
    hostedBy: string;
    aboutEvent: string;
    bannerUrl: string;
    eventType: string;
    location: string;
    website: string | null;
    hostEmail: string;
    eventPictures: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useEvents() {
    const { data, error } = useSWR('/api/events', fetcher);
    return {
        events: data
            ? data.map((event: Event) => ({
                ...event,
                startDate: new Date(event.startDate),
                endDate: new Date(event.endDate),
            }))
            : null,
        isLoading: !error && !data,
        isError: error,
    };
}

export async function deleteEvent(eventId: string, idToken: string) {
    try {
        const response = await fetch('/api/events', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId,
                idToken,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete event');
        }

        mutate('/api/events');

        return await response.json();
    } catch (error) {
        throw error;
    }
}