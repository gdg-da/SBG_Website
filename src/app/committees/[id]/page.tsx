'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditCommitteeButton from "./EditCommitteeButton";

interface Committee {
    id: number;
    name: string;
    description: string;
    convenerPhoto?: string;
    convenerName: string;
    dyConvenerPhoto?: string;
    dyConvenerName: string;
    email: string;
    committeeGroupPhoto?: string;
    [key: string]: unknown;
}

export default function CommitteePage() {
    const [committee, setCommittee] = useState<Committee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const pathname = usePathname();
    const id = pathname.split('/').pop();

    useEffect(() => {
        const fetchCommittee = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/committees');
                if (!response.ok) {
                    throw new Error('Failed to fetch committees');
                }

                const committees = await response.json();
                const foundCommittee = committees.find((c: Committee) => c.id.toString() === id);

                if (!foundCommittee) {
                    throw new Error('Committee not found');
                }

                setCommittee(foundCommittee);
            } catch (err) {
                console.error('Error fetching committee:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch committee');
                setCommittee(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCommittee();
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

    if (error || !committee) {
        return (
            <div className="space-y-6">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Committee Not Found</h1>
                    <p className="text-gray-600">{error || 'The requested committee could not be found.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 relative">
            <EditCommitteeButton committeeId={committee.id} />
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
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <p><strong>Email:</strong> {committee.email}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Committee Photos</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        {committee.committeeGroupPhoto && (<Image src={committee.committeeGroupPhoto} alt={`${committee.name} Group Photo`} width={300} height={200} className="rounded-lg" />)}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}