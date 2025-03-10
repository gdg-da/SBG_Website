import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const committees = [
    { id: 1, name: "Academic Committee" },
    { id: 2, name: "Cultural Committee" },
    { id: 3, name: "Sports Committee" },
]

export default function CommitteesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Committees</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {committees.map((committee) => (
                    <Link href={`/committees/${committee.id}`} key={committee.id}>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>{committee.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Click to view details</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}