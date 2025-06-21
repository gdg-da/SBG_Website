"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAuth } from 'firebase/auth';

interface AddClubModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClubAdded: () => void;
}

export function AddClubModal({ isOpen, onClose, onClubAdded }: AddClubModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        convenerName: '',
        convenerPhoto: '',
        dyConvenerName: '',
        dyConvenerPhoto: '',
        clubGroupPhoto: '',
        description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                alert('Please sign in to add clubs');
                return;
            }

            const idToken = await user.getIdToken();

            const response = await fetch('/api/clubs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    idToken
                }),
            });

            if (response.ok) {
                setFormData({
                    name: '',
                    email: '',
                    convenerName: '',
                    convenerPhoto: '',
                    dyConvenerName: '',
                    dyConvenerPhoto: '',
                    clubGroupPhoto: '',
                    description: ''
                });
                onClubAdded();
                onClose();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to add club');
            }
        } catch (error) {
            console.error('Error adding club:', error);
            alert('Failed to add club');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-background border border-theme-gray-light rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Add New Club</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Club Name *</label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter club name"
                                required
                                className="bg-theme-gray-light/30"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email *</label>
                            <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="club@example.com"
                                required
                                className="bg-theme-gray-light/30"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Convener Name *</label>
                            <Input
                                name="convenerName"
                                value={formData.convenerName}
                                onChange={handleInputChange}
                                placeholder="Enter convener name"
                                required
                                className="bg-theme-gray-light/30"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Convener Photo URL</label>
                            <Input
                                name="convenerPhoto"
                                value={formData.convenerPhoto}
                                onChange={handleInputChange}
                                placeholder="https://example.com/photo.jpg"
                                className="bg-theme-gray-light/30"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Deputy Convener Name</label>
                            <Input
                                name="dyConvenerName"
                                value={formData.dyConvenerName}
                                onChange={handleInputChange}
                                placeholder="Enter deputy convener name"
                                className="bg-theme-gray-light/30"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Deputy Convener Photo URL</label>
                            <Input
                                name="dyConvenerPhoto"
                                value={formData.dyConvenerPhoto}
                                onChange={handleInputChange}
                                placeholder="https://example.com/photo.jpg"
                                className="bg-theme-gray-light/30"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Club Group Photo URL</label>
                        <Input
                            name="clubGroupPhoto"
                            value={formData.clubGroupPhoto}
                            onChange={handleInputChange}
                            placeholder="https://example.com/group-photo.jpg"
                            className="bg-theme-gray-light/30"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description *</label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter club description"
                            required
                            rows={4}
                            className="bg-theme-gray-light/30"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-theme-red hover:bg-theme-red/90"
                        >
                            {isLoading ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Club
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}