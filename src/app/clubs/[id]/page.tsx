import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditClubButton from "./EditClubButton";

async function getClub(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clubs/${id}`, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

interface Club {
    id: number | string;
    [key: string]: unknown;
}

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clubs`);
    const clubs: Club[] = await res.json();

    return clubs.map((club: Club) => ({
        id: club.id.toString(),
    }));
}

export default async function ClubPage({ params }: { params: { id: string } }) {
    const club = await getClub(params.id);

    if (!club) {
        return notFound();
    }

    return (
        <div className="space-y-6 relative">
            <EditClubButton clubId={club.id} />

            <h1 className="text-3xl font-bold">{club.name}</h1>
            <p className="text-lg">{club.description}</p>

            <Card>
                <CardHeader>
                    <CardTitle>Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            {club.convernerPhoto && (
                                <Image
                                    src={club.convernerPhoto}
                                    alt={club.convenerName}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                            )}
                            <p><strong>Convener:</strong> {club.convenerName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {club.dyConvernerPhoto && (
                                <Image
                                    src={club.dyConvernerPhoto}
                                    alt={club.dyConvenerName}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                            )}
                            <p><strong>Deputy Convener:</strong> {club.dyConvenerName}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Club Contact Details</CardTitle></CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <p><strong>Email:</strong> {club.email}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Club Photos</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        {club.clubGroupPhoto && (
                            <Image
                                src={club.clubGroupPhoto}
                                alt={`${club.name} Group Photo`}
                                width={300}
                                height={200}
                                className="rounded-lg"
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}