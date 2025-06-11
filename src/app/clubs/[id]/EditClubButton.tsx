"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { checkSBGAccess } from "@/lib/authUtils";

export default function EditClubButton({ clubId }: { clubId: number }) {
    const [isSBG, setIsSBG] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAccess = async () => {
            const hasAccess = await checkSBGAccess();
            setIsSBG(hasAccess);
            setLoading(false);
        };

        verifyAccess();
    }, []);

    if (loading || !isSBG) {
        return null;
    }

    return (
        <div className="absolute top-0 right-0">
            <Link href={`/clubs/${clubId}/edit`}>
                <Button variant="outline">Edit Club</Button>
            </Link>
        </div>
    );
}