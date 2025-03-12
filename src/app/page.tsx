"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
    return (
        <div className="space-y-6">
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
                        <CardTitle>Popular Clubs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li>Debate Club</li>
                            <li>GDG On Campus</li>
                            <li>Drama Theatre Groups</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Link href="/events">
                    <Button>View All Events</Button>
                </Link>
            </div>
        </div>
    )
}