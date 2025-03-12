import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import committeesData from "@/data/committees.json";

export default function CommitteesPage() {
    const { committees } = committeesData;
    committees.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Committees</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {committeesData.committees.map((committee) => (
                    <Link href={`/committees/${committee.id}`} key={committee.id}>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader><CardTitle>{committee.name}</CardTitle></CardHeader>
                            <CardContent><p>Click to view details</p></CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}