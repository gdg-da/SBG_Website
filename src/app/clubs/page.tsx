import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clubsData from "@/data/clubs.json";

export default function ClubsPage() {
    const { clubs } = clubsData; 
    clubs.sort((a, b) => a.name.localeCompare(b.name)); 

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Clubs</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {clubs.map((club) => (
                    <Link href={`/clubs/${club.id}`} key={club.id}>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader><CardTitle>{club.name}</CardTitle></CardHeader>
                            <CardContent><p>Click to view details</p></CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}