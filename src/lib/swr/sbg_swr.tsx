import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSBG() {
    const { data, error, mutate } = useSWR('/api/sbg', fetcher);
    return {
        sbg: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}