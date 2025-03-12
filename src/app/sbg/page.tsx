import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const sbgData = {
    description:
        "The Student Body Government (SBG) represents the student community and works towards enhancing student life on campus.",
    members: [
        {
            year: "Fourth Year",
            representatives: [
                { name: "Alex Johnson", role: "President", email: "alex@example.com" },
                { name: "Samantha Lee", role: "Vice President", email: "samantha@example.com" },
            ],
        },
        {
            year: "Third Year",
            representatives: [
                { name: "Ryan Chen", role: "Secretary", email: "ryan@example.com" },
                { name: "Emma Watson", role: "Treasurer", email: "emma@example.com" },
            ],
        },
        {
            year: "Second Year",
            representatives: [
                { name: "Daniel Kim", role: "Events Coordinator", email: "daniel@example.com" },
                { name: "Olivia Martinez", role: "Communications Officer", email: "olivia@example.com" },
            ],
        },
        {
            year: "First Year",
            representatives: [
                { name: "Ethan Brown", role: "First Year Representative", email: "ethan@example.com" },
                { name: "Sophia Patel", role: "First Year Representative", email: "sophia@example.com" },
            ],
        },
    ],
}

export default function SBGPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Student Body Government (SBG)</h1>
            <p className="text-lg">{sbgData.description}</p>

            {sbgData.members.map((yearGroup, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{yearGroup.year}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {yearGroup.representatives.map((member, memberIndex) => (
                                <li key={memberIndex}>
                                    <strong>{member.name}</strong> - {member.role} ({member.email})
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}