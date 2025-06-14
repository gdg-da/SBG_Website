"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";

export default function EditCommitteeButton({ committeeId }: { committeeId: number }) {
    const [isSBG, setIsSBG] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
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

    return (
        <div className="absolute top-10 right-10">
            <Link href={`/committees/${committeeId}/edit`}>
                <Button variant="outline">Edit Committee</Button>
            </Link>
        </div>
    );
}