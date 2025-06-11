"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clubsData from "@/data/clubs.json";
import { motion } from "framer-motion";
import { 
    FaCamera, 
    FaTheaterMasks, 
    FaFilm, 
    FaBrain, 
    FaPalette, 
    FaMicroscope, 
    FaCode, 
    FaMicrochip, 
    FaShieldAlt, 
    FaLightbulb, 
    FaBroadcastTower, 
    FaComments, 
    FaNewspaper, 
    FaMusic, 
    FaUserFriends,
    FaChessKnight,
    FaCube,
    FaGoogle,
    FaInfinity,
    FaUserTie
} from "react-icons/fa";
import { IoMdCode } from "react-icons/io";
import { DADCDanceIcon } from "@/components/icons";
import Image from "next/image";

// Map club names to icons
const clubIcons: { [key: string]: any } = {
    "PMMC": FaCamera,
    "Daiict Theatres Group": FaTheaterMasks,
    "Film Club": FaFilm,
    "AI Club": FaBrain,
    "Microsoft Student Technical Club": FaCode,
    "Muse- The Designing Club": FaPalette,
    "Research Club": FaMicroscope,
    "Programming Club": FaInfinity,
    "Electronics Hobby Club": FaMicrochip,
    "Cyber Information and Network Security Club": FaShieldAlt,
    "Headrush": FaLightbulb,
    "DADC": (props: any) => (
        <div className="w-6 h-6">
            <Image 
                src="/dance icon.png" 
                alt="DADC Dance Icon" 
                width={24} 
                height={24} 
                style={{ 
                    objectFit: 'contain',
                    filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(118deg) brightness(118%) contrast(119%)'
                }} 
                {...props} 
            />
        </div>
    ),
    "The Radio Club": FaBroadcastTower,
    "The Debating Society": FaComments,
    "Chess Club": FaChessKnight,
    "Press Club": FaNewspaper,
    "Cubing Club": FaCube,
    "The Music Club": FaMusic,
    "Khelaiya Club": FaUserFriends,
    "Google Developer Group": IoMdCode
};

export default function ClubsPage() {
    const { clubs } = clubsData;
    clubs.sort((a, b) => a.name.localeCompare(b.name));

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
                        Campus <span className="text-emerald-400">Clubs</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                        Discover and join our diverse range of clubs, each offering unique opportunities to learn, create, and connect with like-minded individuals.
                    </p>
                </motion.div>
            </section>

            {/* Clubs Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubs.map((club, index) => {
                        const Icon = clubIcons[club.name] || FaCode; // Default to Code if no icon found
                        return (
                            <motion.div
                                key={club.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/clubs/${club.id}`}>
                                    <Card className="bg-blue-900/30 border-blue-800 text-white hover:bg-blue-900/50 transition-all duration-300 h-full group">
                                        <CardHeader className="flex flex-row items-center gap-4">
                                            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                                                <Icon className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <CardTitle className="text-xl">{club.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-300 line-clamp-3">
                                                {club.description}
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