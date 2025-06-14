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

interface Committee {
    id: number;
    name: string;
    email: string;
    convenerName: string;
    convenerPhoto: string;
    dyConvenerName: string;
    dyConvenerPhoto: string;
    committeeGroupPhoto: string;
    description: string;
}

export default function EditCommitteePage() {
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split('/').slice(-2, -1)[0];
    const [committee, setCommittee] = useState({
        name: "",
        email: "",
        convenerName: "",
        convenerPhoto: "",
        dyConvenerName: "",
        dyConvenerPhoto: "",
        committeeGroupPhoto: "",
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
        const fetchCommittee = async () => {
            try {
                const response = await fetch('/api/committees');
                if (!response.ok) {
                    throw new Error('Failed to fetch committees');
                }

                const committees = await response.json();

                const foundCommittee = committees.find((c: Committee) => c.id.toString() === id);

                if (!foundCommittee) {
                    throw new Error('Committee not found');
                    return;
                }

                setCommittee({
                    name: foundCommittee.name,
                    email: foundCommittee.email,
                    convenerName: foundCommittee.convenerName,
                    convenerPhoto: foundCommittee.convenerPhoto,
                    dyConvenerName: foundCommittee.dyConvenerName,
                    dyConvenerPhoto: foundCommittee.dyConvenerPhoto,
                    committeeGroupPhoto: foundCommittee.committeeGroupPhoto,
                    description: foundCommittee.description
                });
            } catch (error) {
                console.error('Error fetching committee:', error);
                toast.error('Failed to fetch committee data');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCommittee();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCommittee(prev => ({ ...prev, [name]: value }));
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

            const res = await fetch(`/api/committees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...committee,
                    idToken
                }),
            });

            if (res.ok) {
                toast.success('Committee updated successfully');
                router.push(`/committees/${id}`);
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || 'Failed to update committee');
            }
        } catch (error) {
            console.error('Error updating committee:', error);
            toast.error('Error updating committee');
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
            <h1 className="text-2xl font-bold mb-6">Edit Committee</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Committee Name</label>
                    <Input
                        name="name"
                        value={committee.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <Input
                        name="email"
                        type="email"
                        value={committee.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Convener Name</label>
                    <Input
                        name="convenerName"
                        value={committee.convenerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Convener Photo URL</label>
                    <Input
                        name="convenerPhoto"
                        value={committee.convenerPhoto}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Deputy Convener Name</label>
                    <Input
                        name="dyConvenerName"
                        value={committee.dyConvenerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Deputy Convener Photo URL</label>
                    <Input
                        name="dyConvenerPhoto"
                        value={committee.dyConvenerPhoto}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Committee Group Photo URL</label>
                    <Input
                        name="committeeGroupPhoto"
                        value={committee.committeeGroupPhoto}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Description</label>
                    <Textarea
                        name="description"
                        value={committee.description}
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
                        onClick={() => router.push(`/committees/${id}`)}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}