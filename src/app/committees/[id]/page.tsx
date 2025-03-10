import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const committeeData = {
    id: 1,
    name: "Academic Affairs Committee",
    description: "Responsible for overseeing academic policies and curriculum development.",
    members: [
        { name: "Prof. Sarah Johnson", role: "Chairperson", email: "sarah@example.com" },
        { name: "Dr. Michael Chen", role: "Secretary", email: "michael@example.com" },
        { name: "Prof. Emily Brown", role: "Member", email: "emily@example.com" },
        { name: "Dr. David Lee", role: "Member", email: "david@example.com" },
    ],
    events: [
        { id: 1, name: "Curriculum Review Meeting", date: "2023-08-20" },
        { id: 2, name: "Faculty Development Workshop", date: "2023-09-15" },
    ],
    photos: [
        { id: 1, url: "/placeholder.svg?height=200&width=300", alt: "Committee Meeting 2022" },
        { id: 2, url: "/placeholder.svg?height=200&width=300", alt: "Academic Seminar" },
    ],
}

export default function CommitteePage() {
    const committee = committeeData

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{committee.name}</h1>
            <p className="text-lg text-gray-600">{committee.description}</p>

            <Card>
                <CardHeader>
                    <CardTitle>Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {committee.members.map((member, index) => (
                            <li key={index}>
                                {member.name} - {member.role} ({member.email})
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {committee.events.map((event) => (
                            <li key={event.id}>
                                {event.name} - {event.date}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Event Photos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        {committee.photos.map((photo) => (
                            <Image
                                key={photo.id}
                                src={photo.url || "/placeholder.svg"}
                                alt={photo.alt}
                                width={300}
                                height={200}
                                className="rounded-lg"
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}