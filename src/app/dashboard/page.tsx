"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import { Calendar, Users, Award, Users2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        Welcome to the SBG Portal
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {user ? `Welcome back, ${user.displayName}!` : "Please login to access all features"}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <motion.div variants={itemVariants}>
                        <Link href="/events">
                            <Card className="bg-black/40 border-blue-900/50 hover:border-emerald-500/50 transition-colors cursor-pointer">
                                <CardHeader>
                                    <CardTitle className="text-emerald-400 flex items-center">
                                        <Calendar className="mr-2" size={20} />
                                        Events
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        View and manage events
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-400">
                                        Stay updated with all the latest events and activities happening at DAU.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Link href="/clubs">
                            <Card className="bg-black/40 border-blue-900/50 hover:border-emerald-500/50 transition-colors cursor-pointer">
                                <CardHeader>
                                    <CardTitle className="text-emerald-400 flex items-center">
                                        <Users className="mr-2" size={20} />
                                        Clubs
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        Explore student clubs
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-400">
                                        Discover various clubs and their activities at DAU.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Link href="/committees">
                            <Card className="bg-black/40 border-blue-900/50 hover:border-emerald-500/50 transition-colors cursor-pointer">
                                <CardHeader>
                                    <CardTitle className="text-emerald-400 flex items-center">
                                        <Users2 className="mr-2" size={20} />
                                        Committees
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        View committees
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-400">
                                        Learn about different committees and their roles at DAU.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Link href="/sbg">
                            <Card className="bg-black/40 border-blue-900/50 hover:border-emerald-500/50 transition-colors cursor-pointer">
                                <CardHeader>
                                    <CardTitle className="text-emerald-400 flex items-center">
                                        <Award className="mr-2" size={20} />
                                        SBG
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        Student Body Government
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-400">
                                        Information about the Student Body Government and its activities.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
