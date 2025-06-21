"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { useCommittees } from '@/lib/swr/committees_swr';
import { useRouter } from "next/navigation";

export default function DeleteCommitteeButton({ committeeId }: { committeeId: number }) {
    const [isSBG, setIsSBG] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(auth.currentUser);
    const [deletingCommitteeId, setDeletingCommitteeId] = useState<number | null>(null);
    const { mutate } = useCommittees();
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

    const handleDeleteCommittee = async (committeeId: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this committee? This action cannot be undone.');
        if (!confirmed) return;

        setDeletingCommitteeId(committeeId);

        try {
            if (!user) {
                alert('User not authenticated');
                setDeletingCommitteeId(null);
                return;
            }

            const idToken = await user.getIdToken();

            const response = await fetch('/api/committees', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    committeeId,
                    idToken
                }),
            });

            if (response.ok) {
                mutate();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to delete committee');
            }
        } catch {
            alert('Failed to delete committee');
        } finally {
            setDeletingCommitteeId(null);
            router.push('/committees');
        }
    };

    return (
        <div className="absolute top-24 right-10 z-50">
            <Button onClick={(e) => { e.preventDefault(); handleDeleteCommittee(committeeId); }} variant="destructive" size="sm" disabled={deletingCommitteeId === committeeId}>{deletingCommitteeId === committeeId ? (<div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent">Deliting Committee</div>) : (<><Trash2 className="h-4 w-4" /> Delete Committee</>)}</Button>
        </div>
    );
}