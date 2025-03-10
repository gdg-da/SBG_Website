import Link from "next/link"
import { Home, Calendar, Users, PlusCircle, Award, Briefcase } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
    return (
        <div className="w-64 bg-card h-full shadow-lg border-r">
            <div className="p-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">College Admin</h1>
                <ThemeToggle />
            </div>
            <nav className="mt-6">
                <Link href="/" className="block px-6 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
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
                </Link>
            </nav>
        </div>
    )
}