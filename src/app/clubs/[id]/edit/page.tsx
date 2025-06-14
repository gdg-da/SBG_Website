"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/firebaseConfig";
import { getCurrentUserToken } from "@/lib/auth";
import { toast } from "sonner";

interface Club {
    id: number;
    name: string;
    email: string;
    convenerName: string;
    convenerPhoto: string;
    dyConvenerName: string;
    dyConvenerPhoto: string;
    clubGroupPhoto: string;
    description: string;
}

export default function EditClubPage() {
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split('/').slice(-2, -1)[0];
    const [club, setClub] = useState({
        name: "",
        email: "",
        convenerName: "",
        convenerPhoto: "",
        dyConvenerName: "",
        dyConvenerPhoto: "",
        clubGroupPhoto: "",
        description: ""
    });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(auth.currentUser);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user && user.email !== process.env.SBG_EMAIL) {
            router.push("/");
        }
    }, [user, router]);

    useEffect(() => {
        const fetchClub = async () => {
            try {
                const response = await fetch('/api/clubs');
                if (!response.ok) {
                    throw new Error('Failed to fetch clubs');
                }

                const clubs = await response.json();

                const foundClub = clubs.find((c: Club) => c.id.toString() === id);

                if (!foundClub) {
                    throw new Error('Club not found');
                    return;
                }

                setClub({
                    name: foundClub.name,
                    email: foundClub.email,
                    convenerName: foundClub.convenerName,
                    convenerPhoto: foundClub.convenerPhoto,
                    dyConvenerName: foundClub.dyConvenerName,
                    dyConvenerPhoto: foundClub.dyConvenerPhoto,
                    clubGroupPhoto: foundClub.clubGroupPhoto,
                    description: foundClub.description
                });
            } catch (error) {
                console.error('Error fetching club:', error);
                toast.error('Failed to fetch club data');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchClub();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setClub(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error('User not authenticated');
            return;
        }

        try {
            const idToken = await getCurrentUserToken();
            if (!idToken) {
                toast.error('Failed to get authentication token');
                return;
            }

            const res = await fetch(`/api/clubs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...club,
                    idToken
                }),
            });

            if (res.ok) {
                toast.success('Club updated successfully');
                router.push(`/clubs/${id}`);
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || 'Failed to update club');
            }
        } catch (error) {
            console.error('Error updating club:', error);
            toast.error('Error updating club');
        }
    };

    if (authLoading || loading) {
        return (
            <div className="container mx-auto py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Club</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Club Name</label>
                    <Input
                        name="name"
                        value={club.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <Input
                        name="email"
                        type="email"
                        value={club.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Convener Name</label>
                    <Input
                        name="convenerName"
                        value={club.convenerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Convener Photo URL</label>
                    <Input
                        name="convenerPhoto"
                        value={club.convenerPhoto}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Deputy Convener Name</label>
                    <Input
                        name="dyConvenerName"
                        value={club.dyConvenerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Deputy Convener Photo URL</label>
                    <Input
                        name="dyConvenerPhoto"
                        value={club.dyConvenerPhoto}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Club Group Photo URL</label>
                    <Input
                        name="clubGroupPhoto"
                        value={club.clubGroupPhoto}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Description</label>
                    <Textarea
                        name="description"
                        value={club.description}
                        onChange={handleChange}
                        required
                        rows={5}
                    />
                </div>

                <div className="flex gap-2">
                    <Button type="submit">Save Changes</Button>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => router.push(`/clubs/${id}`)}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}