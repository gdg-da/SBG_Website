import { useEffect, useState } from "react"
import { auth } from "@/lib/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { useAnnouncements, deleteAnnouncement } from "@/lib/swr/announcements_swr";

type Announcement = {
    _id: string;
    title: string;
    content: string;
    announcementType: string;
    priority: "high" | "medium" | "low" | "critical";
    expiryDate?: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export function AnnouncementList() {
    const { announcements, isLoading, isError } = useAnnouncements();
    const [user, setUser] = useState(auth.currentUser);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const isAuthorized = user && user.email === process.env.SBG_EMAIL;

    const handleAnnouncementClick = (announcement: Announcement) => {
        if (isAuthorized) {
            setSelectedAnnouncement(announcement);
        }
    };

    const handleDeleteAnnouncement = async () => {
        if (!selectedAnnouncement || !user) return;

        setIsDeleting(true);
        try {
            const idToken = await user.getIdToken();
            await deleteAnnouncement(selectedAnnouncement._id, idToken);
            setSelectedAnnouncement(null);
            alert('Announcement deleted successfully!');
        } catch (error) {
            console.error('Error deleting announcement:', error);
            alert('Failed to delete announcement. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (isError) {
        return (
            <div className="group relative flex items-start gap-3 rounded-xl bg-black/40 p-3 transition-transform hover:translate-x-1">
                <p className="text-sm text-red-400">Failed to load announcements.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
        );
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical':
                return 'bg-red-500';
            case 'high':
                return 'bg-orange-500';
            case 'medium':
                return 'bg-yellow-500';
            case 'low':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <>
            <div>
                {announcements && announcements.length > 0 ? (
                    <ul className="space-y-3">
                        {announcements.map((announcement: Announcement) => (
                            <li
                                key={announcement._id}
                                className={`group relative flex items-start gap-3 rounded-xl bg-black/40 p-3 transition-transform hover:translate-x-1 ${isAuthorized ? 'cursor-pointer' : ''
                                    }`}
                                onClick={() => handleAnnouncementClick(announcement)}
                            >
                                <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(announcement.priority)}`}></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{announcement.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{announcement.content}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs px-2 py-1 rounded-full bg-theme-gray-light text-theme-gray">
                                            {announcement.announcementType}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(announcement.priority)} text-white`}>
                                            {announcement.priority}
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all duration-300 group-hover:w-full"></div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="group relative flex items-start gap-3 rounded-xl bg-black/40 p-3 transition-transform hover:translate-x-1">
                        <p className="text-sm">No announcements available.</p>
                    </div>
                )}
                {isAuthorized && announcements && announcements.length > 0 && (
                    <p className="mt-4 text-xs text-theme-yellow text-center">
                        As an SBG member, you can click on announcements to delete them.
                    </p>
                )}
            </div>
            {selectedAnnouncement && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl rounded-2xl border border-theme-gray-light bg-theme-gray p-6 shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-theme-red/10 to-theme-yellow/5 opacity-50 rounded-2xl" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Delete Announcement</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedAnnouncement(null)}
                                    className="h-8 w-8 rounded-full hover:bg-theme-gray-light"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mb-6">
                                <h1 className="text-xl font-bold text-white mb-2">{selectedAnnouncement.title}</h1>
                                <p className="text-sm text-muted-foreground mb-4">{selectedAnnouncement.content}</p>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs px-2 py-1 rounded-full bg-theme-gray-light text-theme-gray">
                                        {selectedAnnouncement.announcementType}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(selectedAnnouncement.priority)} text-white`}>
                                        {selectedAnnouncement.priority}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Created: {selectedAnnouncement.createdAt.toLocaleDateString()}
                                </p>
                                {selectedAnnouncement.expiryDate && (
                                    <p className="text-xs text-muted-foreground">
                                        Expires: {selectedAnnouncement.expiryDate.toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-6">
                                Are you sure you want to delete this announcement? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedAnnouncement(null)}
                                    className="flex-1 rounded-full border-theme-gray-light hover:bg-theme-gray-light"
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteAnnouncement}
                                    className="flex-1 rounded-full bg-red-600 hover:bg-red-700"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? (
                                        "Deleting..."
                                    ) : (
                                        <>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}