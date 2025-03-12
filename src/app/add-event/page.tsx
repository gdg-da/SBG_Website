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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send this data to your backend
        console.log({ eventName, eventDate, eventDescription })
        // Reset form
        setEventName("")
        setEventDate("")
        setEventDescription("")
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Event</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="eventName">Event Name</Label>
                            <Input id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="eventDate">Event Date</Label>
                            <Input
                                id="eventDate"
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="eventDescription">Event Description</Label>
                            <Textarea
                                id="eventDescription"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit">Add Event</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}