import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useClubs() {
    const { data, error } = useSWR('/api/clubs', fetcher);
    return {
        clubs: data,
        isLoading: !error && !data,
        isError: error,
    };
}