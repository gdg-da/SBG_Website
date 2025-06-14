"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, FileText, Calendar, Trophy, Shield, Heart, Briefcase, GraduationCap, Megaphone, BookOpen, Star, Award, Building, School } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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

const committeeIcons: Record<string, React.ElementType | ((props: React.SVGProps<SVGSVGElement> | React.ComponentProps<typeof Image>) => JSX.Element)> = {
    "Academic Committee": BookOpen,
    "Student Welfare Committee": Heart,
    "Sports Committee": Trophy,
    "Cultural Committee": Star,
    "Discipline Committee": Shield,
    "Anti-Ragging Committee": Users,
    "Placement Committee": Briefcase,
    "Alumni Committee": GraduationCap,
    "Library Committee": FileText,
    "Grievance Committee": Megaphone,
    "Hostel Committee": Building,
    "Event Management Committee": Calendar,
    "Student Council": Award,
    "Academic Affairs Committee": School
};

export default function CommitteesPage() {
    const [committees, setCommittees] = useState<Committee[]>([]);
    const [loading, setLoading] = useState(true);

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
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black">
            <section className="relative py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-500/20 z-0" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Campus <span className="text-pink-400">Committees</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                        Discover our various committees working tirelessly to enhance student life, maintain standards, and create a better campus environment for everyone.
                    </p>
                </motion.div>
            </section>

            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {committees.map((committee, index) => {
                        const Icon = committeeIcons[committee.name];
                        return (
                            <motion.div
                                key={committee.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/committees/${committee.id}`}>
                                    <Card className="bg-purple-900/30 border-purple-800 text-white hover:bg-purple-900/50 transition-all duration-300 h-full group">
                                        <CardHeader className="flex flex-row items-center gap-4">
                                            <div className="p-2 bg-pink-500/10 rounded-lg group-hover:bg-pink-500/20 transition-colors">
                                                {Icon ? (typeof Icon === "function" ? <Icon className="w-8 h-8 text-pink-400" /> : null) : (
                                                    <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded">?</span>
                                                )}
                                            </div>
                                            <CardTitle className="text-xl">{committee.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-300 line-clamp-3">
                                                {committee.description}
                                            </p>
                                            <div className="mt-4 flex items-center text-sm text-pink-400">
                                                <span>View Details</span>
                                                <svg
                                                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}