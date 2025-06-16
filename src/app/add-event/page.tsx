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

export default function AddEvent() {
    const [eventName, setEventName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [hostedBy, setHostedBy] = useState("");
    const [aboutEvent, setAboutEvent] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [eventType, setEventType] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [hostEmail, setHostEmail] = useState("");
    const [eventPictures, setEventPictures] = useState("");
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

            const eventData = {
                idToken,
                eventName,
                startDate,
                endDate,
                hostedBy,
                aboutEvent,
                bannerUrl,
                eventType,
                location,
                website: website || null,
                hostEmail,
                eventPictures,
            };

            const response = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                toast.success("Event added successfully!");
                setEventName("");
                setStartDate("");
                setEndDate("");
                setHostedBy("");
                setAboutEvent("");
                setBannerUrl("");
                setEventType("");
                setLocation("");
                setWebsite("");
                setHostEmail("");
                setEventPictures("");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to add event");
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
                    <CardTitle>Add New Event</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
                        <div>
                            <Label htmlFor="eventName">Event Name</Label>
                            <Input id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="hostedBy">Hosted By</Label>
                            <Input id="hostedBy" value={hostedBy} onChange={(e) => setHostedBy(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="aboutEvent">About Event</Label>
                            <Textarea id="aboutEvent" value={aboutEvent} onChange={(e) => setAboutEvent(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="bannerUrl">Banner URL (Optional)</Label>
                            <Input id="bannerUrl" type="url" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} placeholder="https://example.com/banner.jpg" />
                        </div>
                        <div>
                            <Label htmlFor="eventType">Event Type</Label>
                            <select
                                id="eventType"
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                                required
                                className="border rounded p-2 w-full"
                            >
                                <option value="">Select Event Type</option>
                                <option value="event">Event</option>
                                <option value="exam">Exam</option>
                                <option value="session">Session</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="website">Website (Optional)</Label>
                            <Input id="website" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://event.com" />
                        </div>
                        <div>
                            <Label htmlFor="hostEmail">Host Email</Label>
                            <Input id="hostEmail" type="email" value={hostEmail} onChange={(e) => setHostEmail(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="eventPictures">Event Pictures (Optional) (Google Drive Folder Link)</Label>
                            <Input id="eventPictures" type="url" value={eventPictures} onChange={(e) => setEventPictures(e.target.value)} placeholder="https://drive.google.com/folderview?id=..." />
                        </div>
                        <Button type="submit" className="w-full" disabled={submitting}>
                            {submitting ? "Adding Event..." : "Add Event"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}