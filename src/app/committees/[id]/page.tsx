import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import committeesData from "@/data/committees.json";

export async function generateStaticParams() {
    return committeesData.committees.map((committee) => ({
        id: committee.id.toString(),
    }));
}

export default async function CommitteePage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const committee = committeesData.committees.find((c) => c.id.toString() === resolvedParams.id);

    if (!committee) {
        return notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{committee.name}</h1>
            <p className="text-lg">{committee.description}</p>
            <Card>
                <CardHeader>
                    <CardTitle>Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            {committee.convenerPhoto && (<Image src={committee.convenerPhoto} alt={committee.convenerName} width={50} height={50} className="rounded-full" />)}
                            <p><strong>Convener:</strong> {committee.convenerName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {committee.dyConvenerPhoto && (<Image src={committee.dyConvenerPhoto} alt={committee.dyConvenerName} width={50} height={50} className="rounded-full" />)}
                            <p><strong>Deputy Convener:</strong> {committee.dyConvenerName}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Committee Contact Details</CardTitle></CardHeader>
                <CardContent><div className="flex flex-col gap-4"><p><strong>Email:</strong> {committee.email}</p></div></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Committee Photos</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">{committee.committeeGroupPhoto && (<Image src={committee.committeeGroupPhoto} alt={`${committee.name} Group Photo`} width={300} height={200} className="rounded-lg" />)}</div>
                </CardContent>
            </Card>
        </div>
    );
}