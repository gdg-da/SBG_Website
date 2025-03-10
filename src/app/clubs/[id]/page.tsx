import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This is dummy data. In a real application, you'd fetch this data from an API
const clubData = {
    id: 1,
    name: "Debate Club",
    description: "A platform for students to enhance their public speaking and critical thinking skills.",
    convener: { name: "John Doe", email: "john@example.com" },
    deputyConvener: { name: "Jane Smith", email: "jane@example.com" },
    coreMembers: [
        { name: "Alice Johnson", role: "Secretary", email: "alice@example.com" },
        { name: "Bob Williams", role: "Treasurer", email: "bob@example.com" },
    ],
    teamMembers: [
        { name: "Charlie Brown", email: "charlie@example.com" },
        { name: "Diana Ross", email: "diana@example.com" },
    ],
    events: [
        { id: 1, name: "Annual Debate Competition", date: "2023-06-15" },
        { id: 2, name: "Public Speaking Workshop", date: "2023-07-10" },
    ],
    photos: [
        { id: 1, url: "/placeholder.svg?height=200&width=300", alt: "Debate Competition 2022" },
        { id: 2, url: "/placeholder.svg?height=200&width=300", alt: "Team Building Event" },
    ],
}

export default function ClubPage() {
    // In a real application, you'd fetch the club data based on the id
    // const club = await getClub(params.id)
    const club = clubData

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{club.name}</h1>
            <p className="text-lg text-gray-600">{club.description}</p>

            <Card>
                <CardHeader>
                    <CardTitle>Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        <strong>Convener:</strong> {club.convener.name} ({club.convener.email})
                    </p>
                    <p>
                        <strong>Deputy Convener:</strong> {club.deputyConvener.name} ({club.deputyConvener.email})
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Core Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {club.coreMembers.map((member, index) => (
                            <li key={index}>
                                {member.name} - {member.role} ({member.email})
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {club.teamMembers.map((member, index) => (
                            <li key={index}>
                                {member.name} ({member.email})
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
                        {club.events.map((event) => (
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
                        {club.photos.map((photo) => (
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