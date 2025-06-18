"use client"

import Link from "next/link"
import { GraduationCap, LogIn, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { User as FirebaseUser, signInWithPopup, signOut } from "firebase/auth";

interface Props {
    user: FirebaseUser | null;
    isAuthorized: boolean;
}

export function SiteHeader() {
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
        } catch {
            // Handle login failure (optional: show a toast or alert)
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-theme-gray-light bg-theme-black/80 backdrop-blur supports-[backdrop-filter]:bg-theme-black/60">
            <div className="container flex h-16 items-center px-4 sm:px-6">
                <MainNav user={user} isAuthorized={isAuthorized} />
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        {user ? (
                            <span className="rounded-lg text-muted-foreground px-3 py-1 bg-theme-gray-light/50 hover:text-theme-red cursor-pointer max-w-[160px] truncate" onClick={handleLogout}>
                                Logout {user.displayName || user.email}
                            </span>
                        ) : (
                            <Button
                                onClick={handleLogin}
                                variant="ghost"
                                size="icon"
                                className="rounded-full text-muted-foreground hover:bg-theme-gray-light hover:text-theme-red"
                            >
                                <LogIn className="h-5 w-5" />
                            </Button>
                        )}
                        <MobileNav user={user} isAuthorized={isAuthorized} />
                    </nav>
                </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-theme-red to-transparent opacity-50"></div>
        </header>
    )
}

function MainNav({ user, isAuthorized }: Props) {
    return (
        <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-theme-red to-theme-yellow p-[1px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-theme-black">
                        <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                </div>
                <span className="hidden font-bold sm:inline-block">DAU</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
                <Link
                    href="/events"
                    className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    Events
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
                </Link>
                <Link
                    href="/clubs"
                    className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    Clubs
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
                </Link>
                <Link
                    href="/committees"
                    className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    Committees
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
                </Link>
                <Link
                    href="/sbg"
                    className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    SBG
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
                </Link>
                <Link
                    href="/resources"
                    className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    Resources
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
                </Link>
                {user && user.email && isAuthorized && (
                    <div className="w-fit flex justify-center items-center gap-4">
                        <Link
                            href="/add-event"
                            className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Add Event
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/add-announcement"
                            className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Add Announcement
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    )
}

function MobileNav({ user, isAuthorized }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-muted-foreground hover:bg-theme-gray-light hover:text-theme-red md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-theme-gray-light bg-theme-black">
                <Link href="/" onClick={() => setOpen(false)}>
                    <div className="mb-4 flex items-center gap-2 border-b border-theme-gray-light pb-4">
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-theme-red to-theme-yellow p-[1px]">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-theme-black">
                                <GraduationCap className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <span className="font-bold">SBG DAU</span>
                    </div>
                </Link>
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        onClick={() => setOpen(false)}
                        href="/events"
                        className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
                    >
                        Events
                        <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </Link>
                    <Link
                        onClick={() => setOpen(false)}
                        href="/clubs"
                        className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
                    >
                        Clubs
                        <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </Link>
                    <Link
                        onClick={() => setOpen(false)}
                        href="/committees"
                        className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
                    >
                        Committees
                        <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </Link>
                    <Link
                        onClick={() => setOpen(false)}
                        href="/sbg"
                        className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
                    >
                        SBG
                        <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </Link>
                    <Link
                        onClick={() => setOpen(false)}
                        href="/resources"
                        className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
                    >
                        Resources
                        <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </Link>

                    {user && user.email && isAuthorized && (
                        <div className="">
                            <Link
                                onClick={() => setOpen(false)}
                                href="/add-event"
                                className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
                            >
                                Add Event
                                <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
                            </Link>
                            <Link
                                onClick={() => setOpen(false)}
                                href="/add-announcement"
                                className="group mt-2 flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
                            >
                                Add Announcement
                                <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
                            </Link>
                        </div>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    )
}