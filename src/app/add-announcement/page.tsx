"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { getCurrentUserToken } from "@/lib/auth";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner";

export default function AddAnnouncement() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [announcementType, setAnnouncementType] = useState("");
    const [priority, setPriority] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [user, setUser] = useState(auth.currentUser);
    const [authLoading, setAuthLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user && user.email !== process.env.SBG_EMAIL) {
            router.push("/");
        }
    }, [user, router]);

    if (authLoading) {
        return (
            <div className="container mx-auto py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        if (!user) {
            toast.error("User not authenticated");
            setSubmitting(false);
            return;
        }

        try {
            const idToken = await getCurrentUserToken();
            if (!idToken) {
                toast.error('Failed to get authentication token');
                setSubmitting(false);
                return;
            }

            const announcementData = {
                idToken,
                title,
                content,
                announcementType,
                priority,
                expiryDate: expiryDate || null,
            };

            const response = await fetch("/api/announcements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(announcementData),
            });

            if (response.ok) {
                toast.success("Announcement added successfully!");
                setTitle("");
                setContent("");
                setAnnouncementType("");
                setPriority("");
                setExpiryDate("");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to add announcement");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error submitting form");
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto my-16">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Announcement</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter announcement title"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Enter announcement content"
                                rows={5}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="announcementType">Announcement Type</Label>
                            <select
                                id="announcementType"
                                value={announcementType}
                                onChange={(e) => setAnnouncementType(e.target.value)}
                                required
                                className="border rounded p-2 w-full"
                            >
                                <option value="">Select Announcement Type</option>
                                <option value="general">General</option>
                                <option value="academic">Academic</option>
                                <option value="event">Event</option>
                                <option value="urgent">Urgent</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="priority">Priority</Label>
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                required
                                className="border rounded p-2 w-full"
                            >
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                            <Input
                                id="expiryDate"
                                type="date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={submitting}>
                            {submitting ? "Adding Announcement..." : "Add Announcement"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}