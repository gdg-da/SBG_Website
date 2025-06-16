"use client";

import Link from "next/link";
import { Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { FuturisticDivider } from "@/components/futuristic-divider";
import { Input } from "@/components/ui/input";
import { ClubCard } from "@/components/club-committee/club-card";

interface Committee {
    id: number;
    name: string;
    email: string;
    convenerName: string;
    convenerPhoto: string;
    dyConvenerName: string;
    dyConvenerPhoto: string;
    committeeGroupPhoto: string;
    description: string;
}

export default function CommitteesPage() {
    const [committees, setCommittees] = useState<Committee[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCommittees = committees.filter((committee) => {
        const matchesSearch =
            committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            committee.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            committee.convenerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            committee.dyConvenerName.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })

    useEffect(() => {
        const fetchCommittees = async () => {
            try {
                const response = await fetch('/api/committees');
                const data = await response.json();
                setCommittees(data);
            } catch (error) {
                console.error('Error fetching committees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommittees();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <section className="relative overflow-hidden bg-theme-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] rounded-full bg-theme-yellow opacity-20 blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 -z-10 h-[200px] w-[200px] rounded-full bg-theme-red opacity-20 blur-[100px]"></div>
                </div>
                <div className="container relative z-10 px-4 py-16 md:px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="inline-flex items-center rounded-full border border-theme-gray-light bg-theme-gray-light/30 px-3 py-1 text-sm backdrop-blur-sm">
                            <Users className="mr-2 h-4 w-4 text-theme-yellow" />
                            Student Organizations
                        </div>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            <span className="bg-gradient-to-r from-white to-theme-gray-lighter bg-clip-text text-transparent">Student</span>{" "}
                            <span className="bg-gradient-to-r from-theme-yellow to-theme-red bg-clip-text text-transparent">Committees</span>
                        </h1>
                        <p className="mt-4 text-xl text-muted-foreground">
                            Discover our various committees working tirelessly to enhance student life, maintain standards, and create a better campus environment for everyone.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="h-3 w-3 rounded-full bg-theme-red"></div>
                                <span>{committees.length} Active Committees</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container px-4 py-12 md:px-6">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 rounded-2xl border border-theme-gray-light bg-theme-gray p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-1 items-center gap-4">
                                <p className="text-xl mr-4 text-muted-foreground max-sm:hidden">Search Committees</p>
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search committees..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 rounded-full border-theme-gray-light bg-theme-gray-light/30 focus-visible:ring-theme-red"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <FuturisticDivider className="my-4" />
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCommittees.map((committee) => (
                            <Link key={committee.id} href={`/committees/${committee.id}`}><ClubCard key={committee.id} club={committee} /></Link>
                        ))}
                    </div>

                    {filteredCommittees.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-theme-gray-light/30 flex items-center justify-center"><Users className="h-12 w-12 text-muted-foreground" /></div>
                            <h3 className="text-lg font-semibold">No clubs found</h3>
                            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}