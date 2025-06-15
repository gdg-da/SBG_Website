'use client';

import { ComponentProps, use, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditClubButton from "./EditClubButton";
import { Mail, Search, Camera, Drama, Popcorn, BrainCircuit, Code, Palette, Microscope, Infinity, Cpu, ShieldHalf, Lightbulb, Radio, MessageCircleCode, Swords, Newspaper, Puzzle, Music, Sparkles, Rocket, Users } from "lucide-react";

interface Club {
    id: number;
    name: string;
    description: string;
    convenerPhoto: string;
    convenerName: string;
    dyConvenerPhoto: string;
    dyConvenerName: string;
    email: string;
    clubGroupPhoto: string;
    [key: string]: unknown;
}

const clubIcons: Record<string, React.ElementType | ((props: React.SVGProps<SVGSVGElement> | React.ComponentProps<typeof Image>) => JSX.Element)> = {
    "PMMC": Camera,
    "Daiict Theatres Group": Drama,
    "Film Club": Popcorn,
    "AI Club": BrainCircuit,
    "Microsoft Student Technical Club": Code,
    "Muse- The Designing Club": Palette,
    "Research Club": Microscope,
    "Programming Club": Infinity,
    "Electronics Hobby Club": Cpu,
    "Cyber Information and Network Security Club": ShieldHalf,
    "Headrush": Lightbulb,
    "DADC": (props: ComponentProps<'div'>) => (<div className="w-6 h-6" {...props}><Image src="/dance icon.png" alt="DADC Dance Icon" width={24} height={24} style={{ objectFit: 'contain', filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(118deg) brightness(118%) contrast(119%)' }} /></div>),
    "The Radio Club": Radio,
    "The Debating Society": MessageCircleCode,
    "Chess Club": Swords,
    "Press Club": Newspaper,
    "Cubing Club": Puzzle,
    "The Music Club": Music,
    "Khelaiya Club": Sparkles,
    "Google Developer Group": Rocket
};

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
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-theme-black">
                <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] rounded-full bg-theme-yellow opacity-20 blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 -z-10 h-[200px] w-[200px] rounded-full bg-theme-red opacity-20 blur-[100px]"></div>
                </div>

                <div className="container relative z-10 px-4 py-16 md:px-6">
                <div className="mx-auto max-w-4xl text-center">
                    {/* <div className="inline-flex items-center rounded-full border border-theme-gray-light bg-theme-gray-light/30 px-3 py-1 text-sm backdrop-blur-sm">
                    <Icon className="h-8 w-8 text-theme-yellow" />
                    </div> */}
                    <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    <span className="bg-gradient-to-r from-theme-yellow to-theme-red bg-clip-text text-transparent">
                        {club.name}
                    </span>
                    </h1>
                    <p className="mt-4 text-xl text-muted-foreground">
                        {club.description}
                    </p>
                </div>
                </div>

                <EditClubButton clubId={club.id} />
            </section>

            <section className="container px-4 py-12 md:px-6">
                <div className="mx-auto max-w-7xl">

                <div className="relative mb-6 overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-theme-black/80 via-theme-black/70 to-transparent" />
                    <div className="relative p-6">
                        <div className="flex items-center gap-4">
                            <Image
                                src={club.convenerPhoto} 
                                alt={club.convenerName}
                                width={50}
                                height={50}
                                className="rounded-full"
                                priority
                            />
                            <div className="flex flex-col items-start space-y-4">
                                <div className="space-y-2">
                                <h2 className="text-xl font-bold">{club.convenerName}</h2>
                                <p className="text-muted-foreground">Convener</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mb-6 overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-theme-black/80 via-theme-black/70 to-transparent" />
                    <div className="relative p-6">
                        <div className="flex items-center gap-4">
                            <Image
                                src={club.dyConvenerPhoto} 
                                alt={club.dyConvenerName}
                                width={50}
                                height={50}
                                className="rounded-full"
                                priority
                            />
                            <div className="flex flex-col items-start space-y-4">
                                <div className="space-y-2">
                                <h2 className="text-xl font-bold">{club.dyConvenerName}</h2>
                                <p className="text-muted-foreground">Deputy Convener</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center mb-6">
                <div className="group w-fit p-6 relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray transition-all hover:scale-105 hover:shadow-lg">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-theme-red/10 to-theme-yellow/5 opacity-0 transition-opacity group-hover:opacity-100" />

                    {/* Animated background elements */}
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-theme-red opacity-5 transition-transform group-hover:scale-150" />
                    <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-theme-yellow opacity-5 transition-transform group-hover:scale-150" />
                
                    <div className="relative flex justify-center items-center gap-4">
                        <div className="inline-flex items-center rounded-full border border-theme-gray-light bg-theme-gray-light/30 text-sm backdrop-blur-sm">
                            <Mail className="text-theme-yellow" />
                        </div>
                        <p><strong> {club.email} </strong></p>
                    </div>
                </div>
                </div>

                <div className="relative mb-6 overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-theme-black/80 via-theme-black/70 to-transparent" />
                    <div className="relative p-6">
                        <h2 className="text-xl font-bold mb-2">Club Photos</h2>
                        {club.clubGroupPhoto && (<Image src={club.clubGroupPhoto} alt={`${club.name} Group Photo`} width={300} height={200} className="rounded-lg" />)}
                    </div>
                </div>

                </div>
            </section>
        </div>
    );
}