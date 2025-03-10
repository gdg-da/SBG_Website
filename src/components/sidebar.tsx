"use client"

import Link from "next/link"
import { Home, Calendar, Users, PlusCircle, Award, Briefcase } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

import {
    Menubar,
} from "@/components/ui/menubar"
import { useEffect } from "react"


export function Sidebar() {

    useEffect(() => {
        const elements = document.getElementsByClassName('navlinks');
        [...elements].forEach(ele => {
            ele.addEventListener('click', () => {
                [...elements].forEach(ele2 => {
                    ele2.classList.remove('navlinks-active');
                    ele2.classList.add('navlinks-inactive');
                })
                ele.classList.remove('navlinks-inactive');
                ele.classList.add('navlinks-active');
            })
        });
    }, [])

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
                <Link href="/add-event" className="navlinks navlinks-inactive flex items-center">
                    <PlusCircle className="inline-block mr-2" size={20} />Add Event
                </Link>
            </Menubar>

            {/* <div className="p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">College Admin</h1>
                    <ThemeToggle />
                </div> */}
            {/* <Link href="/" className="block px-6 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    <Home className="inline-block mr-2" size={20} />Dashboard
                </Link>
                <Link href="/events" className="block px-6 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    <Calendar className="inline-block mr-2" size={20} />Events
                </Link>
                <Link href="/clubs" className="block px-6 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    <Users className="inline-block mr-2" size={20} />Clubs
                </Link>
                <Link href="/committees" className="block px-6 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    <Briefcase className="inline-block mr-2" size={20} />Committees
                </Link>
                <Link href="/sbg" className="block px-6 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    <Award className="inline-block mr-2" size={20} />SBG
                </Link>
                <Link href="/add-event" className="block px-6 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    <PlusCircle className="inline-block mr-2" size={20} />Add Event
                </Link> */}
        </nav>
    )
}