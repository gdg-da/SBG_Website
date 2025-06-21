"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { useClubs } from '@/lib/swr/clubs_swr';
import { useRouter } from "next/navigation";

export default function DeleteClubButton({ clubId }: { clubId: number }) {
    const [isSBG, setIsSBG] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(auth.currentUser);
    const [deletingClubId, setDeletingClubId] = useState<number | null>(null);
    const { mutate } = useClubs();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user && user.email === process.env.SBG_EMAIL) {
                setIsSBG(true);
            } else {
                setIsSBG(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading || !isSBG) {
        return null;
    }

    const handleDeleteClub = async (clubId: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this club? This action cannot be undone.');
        if (!confirmed) return;

        setDeletingClubId(clubId);

        try {
            if (!user) {
                alert('User not authenticated');
                setDeletingClubId(null);
                return;
            }

            const idToken = await user.getIdToken();

            const response = await fetch('/api/clubs', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clubId,
                    idToken
                }),
            });

            if (response.ok) {
                mutate();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to delete club');
            }
        } catch {
            alert('Failed to delete club');
        } finally {
            setDeletingClubId(null);
            router.push('/clubs');
        }
    };

    return (
        <div className="absolute top-24 right-10 z-50">
            <Button onClick={(e) => { e.preventDefault(); handleDeleteClub(clubId); }} variant="destructive" size="sm" disabled={deletingClubId === clubId}>{deletingClubId === clubId ? (<div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent">Deliting Club</div>) : (<><Trash2 className="h-4 w-4" /> Delete Club</>)}</Button>
        </div>
    );
}