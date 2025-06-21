import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useClubs() {
    const { data, error, mutate } = useSWR('/api/clubs', fetcher);
    return {
        clubs: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}

export function useClub(id: string) {
    const { data, error, mutate } = useSWR(`/api/clubs/${id}`, fetcher);
    return {
        club: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}