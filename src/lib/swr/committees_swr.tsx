import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCommittees() {
    const { data, error, mutate } = useSWR('/api/committees', fetcher);
    return {
        committees: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}

export function useCommittee(id: string) {
    const { data, error, mutate } = useSWR(`/api/committees/${id}`, fetcher);
    return {
        committee: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}