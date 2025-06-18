import useSWR, { mutate } from 'swr';

type Announcement = {
    _id: string;
    title: string;
    content: string;
    announcementType: string;
    priority: string;
    expiryDate?: Date | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAnnouncements() {
    const { data, error } = useSWR('/api/announcements', fetcher);
    return {
        announcements: data
            ? data.map((announcement: Announcement) => ({
                ...announcement,
                createdAt: new Date(announcement.createdAt),
                updatedAt: new Date(announcement.updatedAt),
                expiryDate: announcement.expiryDate ? new Date(announcement.expiryDate) : null,
            }))
            : null,
        isLoading: !error && !data,
        isError: error,
    };
}

export async function deleteAnnouncement(announcementId: string, idToken: string) {
    try {
        const response = await fetch('/api/announcements', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                announcementId,
                idToken,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete announcement');
        }

        mutate('/api/announcements');

        return await response.json();
    } catch (error) {
        throw error;
    }
}