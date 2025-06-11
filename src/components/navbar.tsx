"use client";

import Link from "next/link";
import { Home, Calendar, Users, PlusCircle, Award, Users2, LayoutDashboard } from "lucide-react";
import { Menubar } from "@/components/ui/menubar";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { isSBGUser, isGDGUser } from "@/lib/checkSBG";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [user, setUser] = useState(auth.currentUser);
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            if (!result.user.email?.endsWith("@dau.ac.in")) {
                await signOut(auth);
                alert("Only @dau.ac.in emails are allowed.");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    const navItemVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95 }
    };

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    return (
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-blue-900/50"
        >
            <div className="max-w-7xl mx-auto px-4">
                <Menubar className="h-16 bg-transparent border-none flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link 
                            href="/" 
                            className={`flex items-center transition-colors ${
                                isActive("/") 
                                    ? "text-white" 
                                    : "text-gray-400 hover:text-emerald-400"
                            }`}
                        >
                            <Home className="inline-block mr-2" size={20} />Home
                        </Link>
                        <Link 
                            href="/dashboard" 
                            className={`flex items-center transition-colors ${
                                isActive("/dashboard") 
                                    ? "text-white" 
                                    : "text-gray-400 hover:text-emerald-400"
                            }`}
                        >
                            <LayoutDashboard className="inline-block mr-2" size={20} />Dashboard
                        </Link>
                        <Link 
                            href="/events" 
                            className={`flex items-center transition-colors ${
                                isActive("/events") 
                                    ? "text-white" 
                                    : "text-gray-400 hover:text-emerald-400"
                            }`}
                        >
                            <Calendar className="inline-block mr-2" size={20} />Events
                        </Link>
                        <Link 
                            href="/clubs" 
                            className={`flex items-center transition-colors ${
                                isActive("/clubs") 
                                    ? "text-white" 
                                    : "text-gray-400 hover:text-emerald-400"
                            }`}
                        >
                            <Users className="inline-block mr-2" size={20} />Clubs
                        </Link>
                        <Link 
                            href="/committees" 
                            className={`flex items-center transition-colors ${
                                isActive("/committees") 
                                    ? "text-white" 
                                    : "text-gray-400 hover:text-emerald-400"
                            }`}
                        >
                            <Users2 className="inline-block mr-2" size={20} />Committees
                        </Link>
                        <Link 
                            href="/sbg" 
                            className={`flex items-center transition-colors ${
                                isActive("/sbg") 
                                    ? "text-white" 
                                    : "text-gray-400 hover:text-emerald-400"
                            }`}
                        >
                            <Award className="inline-block mr-2" size={20} />SBG
                        </Link>
                        {user && user.email && (isSBGUser(user.email) || isGDGUser(user.email)) && (
                            <Link 
                                href="/add-event" 
                                className={`flex items-center transition-colors ${
                                    isActive("/add-event") 
                                        ? "text-white" 
                                        : "text-gray-400 hover:text-emerald-400"
                                }`}
                            >
                                <PlusCircle className="inline-block mr-2" size={20} />Add Event
                            </Link>
                        )}
                    </div>
                    <motion.div
                        variants={navItemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="flex items-center"
                    >
                        {user ? (
                            <motion.button 
                                onClick={handleLogout} 
                                className="px-4 py-2 rounded-lg bg-blue-900/50 text-white hover:bg-blue-800/50 transition-colors flex items-center"
                            >
                                <span className="mr-2">Logout</span>
                                <span className="text-emerald-400">({user.displayName})</span>
                            </motion.button>
                        ) : (
                            <motion.button 
                                onClick={handleLogin} 
                                className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                            >
                                Login
                            </motion.button>
                        )}
                    </motion.div>
                </Menubar>
            </div>
        </motion.nav>
    );
}