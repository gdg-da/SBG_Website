'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditClubButton from "./EditClubButton";

interface Club {
    id: number;
    name: string;
    description: string;
    convenerPhoto?: string;
    convenerName: string;
    dyconvenerPhoto?: string;
    dyConvenerName: string;
    email: string;
    clubGroupPhoto?: string;
    [key: string]: unknown;
}

export default function ClubPage() {
    const [club, setClub] = useState<Club | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const pathname = usePathname();
    const id = pathname.split('/').pop();

    useEffect(() => {
        const fetchClub = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/clubs');
                if (!response.ok) {
                    throw new Error('Failed to fetch clubs');
                }

                const clubs = await response.json();
                const foundClub = clubs.find((c: Club) => c.id.toString() === id);

                if (!foundClub) {
                    throw new Error('Club not found');
                }

                setClub(foundClub);
            } catch (err) {
                console.error('Error fetching club:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch club');
                setClub(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchClub();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                    <div className="h-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-32 bg-gray-200 rounded mb-4"></div>
                </div>
            </div>
        );
    }

    if (error || !club) {
        return (
            <div className="space-y-6">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Club Not Found</h1>
                    <p className="text-gray-600">{error || 'The requested club could not be found.'}</p>
                </div>
            </div>
        );
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
                            {club.convenerPhoto && (<Image src={club.convenerPhoto} alt={club.convenerName} width={50} height={50} className="rounded-full" />)}
                            <p><strong>Convener:</strong> {club.convenerName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {club.dyconvenerPhoto && (<Image src={club.dyconvenerPhoto} alt={club.dyConvenerName} width={50} height={50} className="rounded-full" />)}
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
                        {club.clubGroupPhoto && (<Image src={club.clubGroupPhoto} alt={`${club.name} Group Photo`} width={300} height={200} className="rounded-lg" />)}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}