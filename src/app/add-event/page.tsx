"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { isSBGUser } from "@/lib/checkSBG";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddEvent() {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const eventData = {
            eventName,
            startDate,
            endDate,
            hostedBy,
            aboutEvent,
            bannerUrl,
            eventType,
            location,
            website: website || null, // Handle optional field
            hostEmail,
            eventPictures,
        };

        try {
            const response = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                alert("Event added successfully!");
                // Reset form fields
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
                alert("Failed to add event");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const [eventName, setEventName] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [user, setUser] = useState(auth.currentUser);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user || !user.email || !isSBGUser(user.email)) {
                router.push("/");
            } else {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (!user) return <p>Loading...</p>;


    return (
        <div className="max-w-2xl mx-auto">
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
                            <Input
                                id="bannerUrl"
                                type="url"
                                value={bannerUrl}
                                onChange={(e) => setBannerUrl(e.target.value)}
                                placeholder="https://example.com/banner.jpg"
                            />
                        </div>
                        <div>
                            <Label htmlFor="eventType">Event Type</Label>
                            <Input id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} required />
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
                            <Input
                                id="eventPictures"
                                type="url"
                                value={eventPictures}
                                onChange={(e) => setEventPictures(e.target.value)}
                                placeholder="https://drive.google.com/folderview?id=..."
                            />
                        </div>
                        <Button type="submit" className="w-full">Add Event</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}