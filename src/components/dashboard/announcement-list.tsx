import { useEffect, useState } from "react"

type Announcement = {
    title: string;
    priority: "high" | "medium" | "low" | "critical";
}

export function AnnouncementList() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('/api/announcements');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnnouncements(data);
            } catch {
                //handle error
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
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
        <div>
            {announcements && announcements.length > 0 ? (
                <ul className="space-y-3" >
                    {announcements.map((announcement, index) => (
                        <li key={index} className="group relative flex items-start gap-3 rounded-xl bg-black/40 p-3 transition-transform hover:translate-x-1">
                            <p className="text-sm">{announcement.title}</p>
                            <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all duration-300 group-hover:w-full"></div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="group relative flex items-start gap-3 rounded-xl bg-black/40 p-3 transition-transform hover:translate-x-1">
                    <p className="text-sm">No announcements available.</p>
                </div>
            )}
        </div >
    )
}