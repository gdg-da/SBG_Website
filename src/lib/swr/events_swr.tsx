import useSWR from 'swr';


type Event = {
    eventName: string;
    startDate: string;
    endDate: string;
    hostedBy: string;
    location: string;
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