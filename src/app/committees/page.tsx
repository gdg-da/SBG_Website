"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import committeesData from "@/data/committees.json";
import { motion } from "framer-motion";
import { 
    FaCalendarAlt,
    FaBriefcase,
    FaUtensils,
    FaGraduationCap,
    FaLaptopCode,
    FaRunning,
    FaMusic,
    FaMicrochip,
    FaArrowLeft
} from "react-icons/fa";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { IconType } from "react-icons";

interface Committee {
    id: number;
    name: string;
    description: string;
    convenerName: string;
    convenerPhoto: string;
    dyConvenerName: string;
    dyConvenerPhoto: string;
    email: string;
    committeeGroupPhoto: string;
}

interface CommitteesData {
    committees: Committee[];
}

// Map committee names to icons
const committeeIcons: { [key: string]: IconType } = {
    "Annual Festival Committee": FaCalendarAlt,
    "Student Placement Cell": FaBriefcase,
    "Cafeteria Management Committee": FaUtensils,
    "Academic Committee": FaGraduationCap,
    "TechSupport Committee": FaLaptopCode,
    "Sports Committee": FaRunning,
    "Cultural Committee": FaMusic,
    "IEEE Student Branch": FaMicrochip
};

export default function CommitteesPage() {
    const searchParams = useSearchParams();
    const committeeId = searchParams.get('id');

    if (!committeesData || !committeesData.committees) {
        return <div>Loading...</div>;
    }

    const { committees } = committeesData as CommitteesData;
    committees.sort((a, b) => a.name.localeCompare(b.name));

    // If a committee ID is provided, show that committee's details
    if (committeeId) {
        const committee = committees.find(c => c.id.toString() === committeeId);
        if (!committee) {
            return <div>Committee not found</div>;
        }

        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black">
                {/* Back Button */}
                <div className="max-w-7xl mx-auto px-4 pt-20">
                    <Link href="/committees" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors mb-8">
                        <FaArrowLeft className="mr-2" /> Back to Committees
                    </Link>
                </div>

                {/* Hero Section */}
                <section className="relative py-20 px-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-emerald-500/20 z-0" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto relative z-10"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            {committee.name}
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                            {committee.description}
                        </p>
                    </motion.div>
                </section>

                {/* Committee Details */}
                <div className="max-w-7xl mx-auto px-4 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Convener */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="bg-blue-900/30 border-blue-800 text-white">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-emerald-400">Convener</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden">
                                            <Image
                                                src={committee.convenerPhoto}
                                                alt={committee.convenerName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{committee.convenerName}</h3>
                                            <p className="text-gray-400">{committee.email}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Deputy Convener */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="bg-blue-900/30 border-blue-800 text-white">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-emerald-400">Deputy Convener</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden">
                                            <Image
                                                src={committee.dyConvenerPhoto}
                                                alt={committee.dyConvenerName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{committee.dyConvenerName}</h3>
                                            <p className="text-gray-400">{committee.email}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Committee Group Photo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-8"
                    >
                        <Card className="bg-blue-900/30 border-blue-800 text-white">
                            <CardHeader>
                                <CardTitle className="text-2xl text-emerald-400">Committee Photo</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                                    <Image
                                        src={committee.committeeGroupPhoto}
                                        alt={`${committee.name} Group Photo`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        );
    }

    // If no committee ID is provided, show the committees list
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black">
            {/* Hero Section */}
            <section className="relative py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-emerald-500/20 z-0" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Campus <span className="text-emerald-400">Committees</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                        Explore our dedicated committees that work tirelessly to enhance campus life, manage resources, and create opportunities for students.
                    </p>
                </motion.div>
            </section>

            {/* Committees Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {committees.map((committee, index) => {
                        const Icon = committeeIcons[committee.name] || FaMicrochip; // Default to Microchip if no icon found
                        return (
                            <motion.div
                                key={committee.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/committees?id=${committee.id}`}>
                                    <Card className="bg-blue-900/30 border-blue-800 text-white hover:bg-blue-900/50 transition-all duration-300 h-full group">
                                        <CardHeader className="flex flex-row items-center gap-4">
                                            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                                                <Icon className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <CardTitle className="text-xl">{committee.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-300 line-clamp-3">
                                                {committee.description}
                                            </p>
                                            <div className="mt-4 flex items-center text-sm text-emerald-400">
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