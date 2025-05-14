import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clubsData from "@/data/clubs.json";

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
    return clubsData.clubs.map((club) => ({
        id: club.id.toString(),
    }));
}

export default async function ClubPage({ params }: PageProps) {
    const resolvedParams = await params;
    const club = clubsData.clubs.find((c) => c.id.toString() === resolvedParams.id);

    if (!club) {
        return notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{club.name}</h1>
            <p className="text-lg">{club.description}</p>
            <Card>
                <CardHeader>
                    <CardTitle>Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            {club.convernerPhoto && (<Image src={club.convernerPhoto} alt={club.convenerName} width={50} height={50} className="rounded-full" />)}
                            <p><strong>Convener:</strong> {club.convenerName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {club.dyConvernerPhoto && (<Image src={club.dyConvernerPhoto} alt={club.dyConvenerName} width={50} height={50} className="rounded-full" />)}
                            <p><strong>Deputy Convener:</strong> {club.dyConvenerName}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Club Contact Details</CardTitle></CardHeader>
                <CardContent><div className="flex flex-col gap-4"><p><strong>Email:</strong> {club.email}</p></div></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Club Photos</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">{club.clubGroupPhoto && (<Image src={club.clubGroupPhoto} alt={`${club.name} Group Photo`} width={300} height={200} className="rounded-lg" />)}</div>
                </CardContent>
            </Card>
        </div>
    );
}