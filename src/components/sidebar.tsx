"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Home, Calendar, Users, PlusCircle, Award, Briefcase, BookOpen } from "lucide-react";
import { Menubar } from "@/components/ui/menubar";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

export function Sidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState(auth.currentUser);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setIsAuthorized(user?.email === process.env.SBG_EMAIL);
    }, [user?.email]);

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

    return (
        <nav className="m-4 w-fit flex justify-between items-center">
            <Menubar className="pl-4 pr-4 flex gap-6 justify-around items-center">
                <Link 
                    href="/" 
                    className={`navlinks flex items-center ${
                        pathname === "/"
                        ? 'navlinks-active'
                        : 'navlinks-inactive'
                    }`}
                >
                    <Home className="inline-block mr-2" size={20} />Home
                </Link>
                <Link href="/events" className={`navlinks flex items-center ${
                        pathname === "/events"
                        ? 'navlinks-active'
                        : 'navlinks-inactive'
                    }`}>
                    <Calendar className="inline-block mr-2" size={20} />Events
                </Link>
                <Link href="/clubs" className={`navlinks flex items-center ${
                        pathname === "/clubs"
                        ? 'navlinks-active'
                        : 'navlinks-inactive'
                    }`}>
                    <Users className="inline-block mr-2" size={20} />Clubs
                </Link>
                <Link href="/committees" className={`navlinks flex items-center ${
                        pathname === "/committees"
                        ? 'navlinks-active'
                        : 'navlinks-inactive'
                    }`}>
                    <Briefcase className="inline-block mr-2" size={20} />Committees
                </Link>
                <Link href="/sbg" className={`navlinks flex items-center ${
                        pathname === "/sbg"
                        ? 'navlinks-active'
                        : 'navlinks-inactive'
                    }`}>
                    <Award className="inline-block mr-2" size={20} />SBG
                </Link>
                <Link 
                    href="/resources" 
                    className={`navlinks flex items-center ${
                        pathname === "/resources"
                        ? 'navlinks-active'
                        : 'navlinks-inactive'
                    }`}
                >
                    <BookOpen className="inline-block mr-2" size={20} />Resources
                </Link>
                {user && user.email && isAuthorized && (
                    <Link href="/add-event" className={`navlinks flex items-center ${
                        pathname === "/add-event"
                        ? 'navlinks-active'
                        : 'navlinks-inactive'
                    }`}>
                        <PlusCircle className="inline-block mr-2" size={20} />Add Event
                    </Link>
                )}
                {user ? (
                    <button onClick={handleLogout} className="navlinks flex items-center">
                        Logout ({user.displayName})
                    </button>
                ) : (
                    <button onClick={handleLogin} className="navlinks flex items-center">
                        Login
                    </button>
                )}
            </Menubar>
        </nav>
    );
}