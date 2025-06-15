"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section";
import { StatCard } from "@/components/dashboard/stats-card"
import { AnnouncementList } from "@/components/dashboard/announcement-list"
import { EventsList } from "@/components/dashboard/event-list"
import { FuturisticDivider } from "@/components/futuristic-divider"

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <HeroSection />

                <section className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            {/* Left sidebar with stats */}
                            <div className="space-y-6">
                                <div className="relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-theme-red/20 to-theme-yellow/5 opacity-50" />
                                    <div className="relative space-y-4 p-5">
                                        <h2 className="flex items-center text-xl font-bold">
                                            <Star className="mr-2 h-5 w-5 text-theme-yellow" />
                                            SBG Stats
                                        </h2>
                                        <div className="grid gap-4">
                                            <StatCard title="Active Clubs" value="25" icon="Users" />
                                            <StatCard title="Committees" value="9" icon="ClipboardList" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-theme-yellow/20 to-theme-red/5 opacity-50" />
                                    <div className="relative space-y-4 p-5">
                                        <h2 className="flex items-center text-xl font-bold">
                                            <CalendarDays className="mr-2 h-5 w-5 text-theme-yellow" />
                                            This Week
                                        </h2>
                                        <div className="rounded-xl bg-black/40 p-4">
                                            <div className="text-center">
                                                <p className="text-sm text-muted-foreground">22th June to</p>
                                                <p className="text-lg font-bold">28th June</p>
                                                <div className="mt-2 flex items-center justify-center">
                                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-theme-red text-2xl font-bold">
                                                        5
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-sm text-muted-foreground">Events Scheduled</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/events"
                                        >
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-between border-t border-theme-gray-light pt-2 text-theme-red"
                                            >
                                                View Calendar
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-theme-red/20 to-theme-yellow/5 opacity-50" />
                                    <div className="relative space-y-4 p-5">
                                        <h2 className="flex items-center text-xl font-bold">Quick Links</h2>
                                        <nav className="flex flex-col space-y-1">
                                            <Link
                                                href="/events"
                                                className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-theme-gray-light"
                                            >
                                                <span>All Events</span>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:text-theme-red group-hover:translate-x-1" />
                                            </Link>
                                            <Link
                                                href="/clubs"
                                                className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-theme-gray-light"
                                            >
                                                <span>Clubs Directory</span>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:text-theme-red group-hover:translate-x-1" />
                                            </Link>
                                            <Link
                                                href="/committees"
                                                className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-theme-gray-light"
                                            >
                                                <span>Committees</span>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:text-theme-red group-hover:translate-x-1" />
                                            </Link>
                                            <Link
                                                href="/resources"
                                                className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-theme-gray-light"
                                            >
                                                <span>Resources</span>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:text-theme-red group-hover:translate-x-1" />
                                            </Link>
                                            <Link
                                                href="/login"
                                                className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-theme-gray-light"
                                            >
                                                <span>Login</span>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:text-theme-red group-hover:translate-x-1" />
                                            </Link>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Main content area */}
                            <div className="space-y-6 lg:col-span-2">
                                <div className="relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-theme-red/20 to-theme-yellow/5 opacity-50" />
                                    <div className="relative p-5">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold">SBG Announcements</h2>
                                            <Button variant="ghost" size="sm" className="text-theme-red">
                                                View All
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                        <FuturisticDivider className="my-4" />
                                        <AnnouncementList />
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-theme-yellow/20 to-theme-red/5 opacity-50" />
                                    <div className="relative p-5">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold">Upcoming Events</h2>
                                            <Button variant="ghost" size="sm" className="text-theme-red">
                                                View All
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                        <FuturisticDivider className="my-4" />
                                        <EventsList />
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-20" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-theme-black/80 via-theme-black/70 to-transparent" />
                                    <div className="relative p-6">
                                        <div className="flex flex-col items-start space-y-4">
                                            <div className="space-y-2">
                                                <h2 className="text-xl font-bold">Powered by people</h2>
                                                <p className="text-muted-foreground">Driven by purpose</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}