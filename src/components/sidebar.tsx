"use client";

import Link from "next/link";
import { Home, Calendar, Users, PlusCircle, Award, Briefcase } from "lucide-react";
import { Menubar } from "@/components/ui/menubar";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { isSBGUser, isGDGUser } from "@/lib/checkSBG";

export function Sidebar() {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        const elements = document.getElementsByClassName("navlinks");
        [...elements].forEach((ele) => {
            ele.addEventListener("click", () => {
                [...elements].forEach((ele2) => {
                    ele2.classList.remove("navlinks-active");
                    ele2.classList.add("navlinks-inactive");
                });
                ele.classList.remove("navlinks-inactive");
                ele.classList.add("navlinks-active");
            });
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            if (!result.user.email?.endsWith("@daiict.ac.in")) {
                await signOut(auth);
                alert("Only @daiict.ac.in emails are allowed.");
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
                <Link href="/" className="navlinks navlinks-active flex items-center">
                    <Home className="inline-block mr-2" size={20} />Dashboard
                </Link>
                <Link href="/events" className="navlinks navlinks-inactive flex items-center">
                    <Calendar className="inline-block mr-2" size={20} />Events
                </Link>
                <Link href="/clubs" className="navlinks navlinks-inactive flex items-center">
                    <Users className="inline-block mr-2" size={20} />Clubs
                </Link>
                <Link href="/committees" className="navlinks navlinks-inactive flex items-center">
                    <Briefcase className="inline-block mr-2" size={20} />Committees
                </Link>
                <Link href="/sbg" className="navlinks navlinks-inactive flex items-center">
                    <Award className="inline-block mr-2" size={20} />SBG
                </Link>
                {user && user.email && (isSBGUser(user.email) || isGDGUser(user.email)) && (
                    <Link href="/add-event" className="navlinks navlinks-inactive flex items-center">
                        <PlusCircle className="inline-block mr-2" size={20} />Add Event
                    </Link>
                )}
                {user ? (
                    <button onClick={handleLogout} className="navlinks navlinks-inactive flex items-center">
                        Logout ({user.displayName})
                    </button>
                ) : (
                    <button onClick={handleLogin} className="navlinks navlinks-inactive flex items-center">
                        Login
                    </button>
                )}
            </Menubar>
        </nav>
    );
}