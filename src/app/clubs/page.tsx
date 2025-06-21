"use client";

import Link from "next/link";
import { auth } from "@/lib/firebaseConfig";
import { Search, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { ClubCard } from "@/components/club-committee/club-card";
import { FuturisticDivider } from "@/components/futuristic-divider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useClubs } from '@/lib/swr/clubs_swr';
import { AddClubModal } from "@/components/add-club-modal";

interface Club {
    id: number;
    name: string;
    email: string;
    convenerName: string;
    convenerPhoto: string;
    dyConvenerName: string;
    dyConvenerPhoto: string;
    clubGroupPhoto: string;
    description: string;
}

export default function ClubsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [user, setUser] = useState(auth.currentUser);
    const { clubs, isLoading, isError, mutate } = useClubs();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const isAuthorized = user && user.email === process.env.SBG_EMAIL

    const handleClubAdded = () => {
        mutate();
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (isError) alert("Failed to load clubs");

    const filteredClubs = clubs.filter((club: Club) => {
        const matchesSearch =
            club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.convenerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.dyConvenerName.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })

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
                            <span className="bg-gradient-to-r from-white to-theme-gray-lighter bg-clip-text text-transparent">Student</span>{" "}<span className="bg-gradient-to-r from-theme-yellow to-theme-red bg-clip-text text-transparent">Clubs</span>
                        </h1>
                        <p className="mt-4 text-xl text-muted-foreground">
                            Discover and join our diverse range of clubs, each offering unique opportunities to learn, create, and connect with like-minded individuals.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="h-3 w-3 rounded-full bg-theme-red"></div>
                                <span>{clubs.length} Active Clubs</span>
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
                                <p className="text-xl mr-4 text-muted-foreground max-sm:hidden">Search Clubs</p>
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search clubs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 rounded-full border-theme-gray-light bg-theme-gray-light/30 focus-visible:ring-theme-red"
                                    />
                                </div>
                            </div>
                            {isAuthorized && (<Button onClick={() => setIsAddModalOpen(true)} className="bg-theme-red hover:bg-theme-red/90 text-white"><Plus className="mr-2 h-4 w-4" />Add Club</Button>)}
                        </div>
                    </div>
                    <FuturisticDivider className="my-4" />
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredClubs.map((club: Club) => (
                            <Link key={club.id} href={`/clubs/${club.id}`}><ClubCard key={club.id} club={club} /></Link>
                        ))}
                    </div>
                    {filteredClubs.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-theme-gray-light/30 flex items-center justify-center">
                                <Users className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold">No clubs found</h3>
                            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </section>
            <AddClubModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onClubAdded={handleClubAdded} />
        </div>
    );
}