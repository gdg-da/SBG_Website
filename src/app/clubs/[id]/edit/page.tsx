"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { checkSBGAccess } from "@/lib/authUtils";
import { toast } from "sonner";

export default function EditClubPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [club, setClub] = useState({
        name: "",
        email: "",
        convenerName: "",
        convernerPhoto: "",
        dyConvenerName: "",
        dyConvernerPhoto: "",
        clubGroupPhoto: "",
        description: ""
    });
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        const verifyAccess = async () => {
            const access = await checkSBGAccess();
            setHasAccess(access);

            if (!access) {
                router.push(`/clubs/${params.id}`);
                return;
            }

            const fetchClub = async () => {
                try {
                    const res = await fetch(`/api/clubs/${params.id}`);
                    const data = await res.json();
                    setClub(data);
                } catch (error) {
                    console.error('Error fetching club:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchClub();
        };

        verifyAccess();
    }, [params.id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setClub(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/clubs/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(club),
            });

            if (res.ok) {
                toast.success('Club updated successfully');
                router.push(`/clubs/${params.id}`);
            } else {
                toast.error('Failed to update club');
            }
        } catch (error) {
            console.error('Error updating club:', error);
            toast.error('Error updating club');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!hasAccess) {
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
                        name="convernerPhoto"
                        value={club.convernerPhoto}
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
                        name="dyConvernerPhoto"
                        value={club.dyConvernerPhoto}
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
                        onClick={() => router.push(`/clubs/${params.id}`)}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}