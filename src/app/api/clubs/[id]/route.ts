import { NextRequest, NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
import { verifyFirebaseToken, isAuthorizedUser } from '@/lib/firebaseAdmin';
import Club from '@/models/Club';

export async function GET({ params }: { params: { id: string } }) {
    try {
        await connectDB();
        const club = await Club.findOne({ id: params.id });

        if (!club) {
            return NextResponse.json({ message: 'Club not found' }, { status: 404 });
        }

        return NextResponse.json(club);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching club', error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { idToken, ...clubData } = body;

        if (!idToken) {
            return NextResponse.json({ message: 'Authentication token required' }, { status: 401 });
        }

        let decodedToken;

        try {
            decodedToken = await verifyFirebaseToken(idToken);
        } catch {
            return NextResponse.json({ message: 'Invalid authentication token' }, { status: 401 });
        }

        if (!isAuthorizedUser(decodedToken.email)) {
            return NextResponse.json({ message: 'Unauthorized: Only SBG can update clubs' }, { status: 403 });
        }

        await connectDB();

        const updatedClub = await Club.findOneAndUpdate({ id: params.id }, clubData, { new: true });

        if (!updatedClub) {
            return NextResponse.json({ message: 'Club not found' }, { status: 404 });
        }

        return NextResponse.json(updatedClub);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating club', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}