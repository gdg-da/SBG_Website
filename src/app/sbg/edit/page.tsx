'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/firebaseConfig';
import { useSBG } from '@/lib/swr/sbg_swr';
import { Plus, Trash2 } from 'lucide-react';

interface SBGMember {
    position: string;
    representatives: {
        name: string;
        email: string;
    };
}

export default function EditSBGPage() {
    const router = useRouter();
    const { sbg, isLoading, mutate } = useSBG();
    const [user, setUser] = useState(auth.currentUser);
    const [authLoading, setAuthLoading] = useState(true);
    const [formData, setFormData] = useState({ description: '', members: [] as SBGMember[] });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (sbg) {
            setFormData({
                description: sbg.description || '',
                members: sbg.members || []
            });
        }
    }, [sbg]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            const idToken = await user.getIdToken();
            const response = await fetch('/api/sbg', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken,
                    ...formData
                }),
            });

            if (response.ok) {
                mutate();
                router.push('/sbg');
            } else {
                alert('Failed to update SBG data');
            }
        } catch (error) {
            console.error('Error updating SBG:', error);
            alert('Error updating SBG data');
        } finally {
            setIsSubmitting(false);
        }
    };

    const addMember = () => {
        setFormData({
            ...formData,
            members: [
                ...formData.members,
                {
                    position: '',
                    representatives: {
                        name: '',
                        email: ''
                    }
                }
            ]
        });
    };

    const removeMember = (index: number) => {
        setFormData({
            ...formData,
            members: formData.members.filter((_, i) => i !== index)
        });
    };

    const updateMember = (index: number, field: string, value: string) => {
        const updatedMembers = [...formData.members];

        if (field === 'position') {
            updatedMembers[index].position = value;
        } else if (field === 'name') {
            updatedMembers[index].representatives.name = value;
        } else if (field === 'email') {
            updatedMembers[index].representatives.email = value;
        }

        setFormData({
            ...formData,
            members: updatedMembers
        });
    };

    if (authLoading || isLoading) {
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
        router.push("/");
    }

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Edit SBG Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter SBG description"
                                    required
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <Label className="text-lg font-semibold">Members</Label>
                                    <Button
                                        type="button"
                                        onClick={addMember}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Member
                                    </Button>
                                </div>

                                {formData.members.map((member, index) => (
                                    <Card key={index} className="mb-4">
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="font-semibold">Member {index + 1}</h4>
                                                <Button
                                                    type="button"
                                                    onClick={() => removeMember(index)}
                                                    variant="destructive"
                                                    size="sm"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <Label htmlFor={`position-${index}`}>Position</Label>
                                                    <Input
                                                        id={`position-${index}`}
                                                        value={member.position}
                                                        onChange={(e) => updateMember(index, 'position', e.target.value)}
                                                        placeholder="e.g., Convenor"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`name-${index}`}>Name</Label>
                                                    <Input
                                                        id={`name-${index}`}
                                                        value={member.representatives.name}
                                                        onChange={(e) => updateMember(index, 'name', e.target.value)}
                                                        placeholder="Enter name"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`email-${index}`}>Email</Label>
                                                    <Input
                                                        id={`email-${index}`}
                                                        type="email"
                                                        value={member.representatives.email}
                                                        onChange={(e) => updateMember(index, 'email', e.target.value)}
                                                        placeholder="Enter email"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-theme-red hover:bg-theme-red/90"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => router.push('/sbg')}
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}