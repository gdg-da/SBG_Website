"use client"

import Link from "next/link"
import Image from 'next/image';
import sbglogo from "@/data/sbglogo.png";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HomePage() {
    return (
        <div className="space-y-6">

            <div className="flex justify-center items-center">
                <Image
                    src={sbglogo} // Path relative to /public
                    alt="Event Banner"
                    width={180} // Desired display width
                    height={180} // Desired display height
                    className="mb-4"
                    priority
                />
            </div>
            
            <h1 className="text-center text-5xl font-bold">Student Body Government</h1>
            <p className="text-center text-2xl">Powered by people, driven by purpose</p>
            <div className="flex justify-center">
                <Link href="/events">
                    <Button>View All Events</Button>
                </Link>
            </div>
            
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Events</CardTitle>
                        <CardDescription>Next 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">5</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Clubs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">12</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Committees</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">8</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li>Annual Sports Meet - May 15</li>
                            <li>Synapse - May 10</li>
                            <li>i.Fest - May 5</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>SBG Announcements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li>General Meet on May 17</li>
                            <li>General Meet Verdict Results</li>
                            <li>Google Form for club data</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}