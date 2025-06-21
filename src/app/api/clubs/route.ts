import { NextRequest, NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
import { verifyFirebaseToken, isAuthorizedUser } from '@/lib/firebaseAdmin';
import Club from '@/models/Club';

export async function GET() {
    try {
        await connectDB();
        const clubs = await Club.find().sort({ name: 1 });

        return NextResponse.json(clubs);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching clubs', error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
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
            return NextResponse.json({ message: 'Unauthorized: Only SBG can create clubs' }, { status: 403 });
        }

        await connectDB();

        const lastClub = await Club.findOne().sort({ id: -1 });
        const nextId = lastClub ? lastClub.id + 1 : 1;

        const newClub = new Club({
            ...clubData,
            id: nextId
        });

        await newClub.save();

        return NextResponse.json(newClub, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating club', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { idToken, clubId } = body;

        if (!idToken) {
            return NextResponse.json({ message: 'Authentication token required' }, { status: 401 });
        }

        if (!clubId) {
            return NextResponse.json({ message: 'Club ID required' }, { status: 400 });
        }

        let decodedToken;

        try {
            decodedToken = await verifyFirebaseToken(idToken);
        } catch {
            return NextResponse.json({ message: 'Invalid authentication token' }, { status: 401 });
        }

        if (!isAuthorizedUser(decodedToken.email)) {
            return NextResponse.json({ message: 'Unauthorized: Only SBG can delete clubs' }, { status: 403 });
        }

        await connectDB();

        const deletedClub = await Club.findOneAndDelete({ id: clubId });

        if (!deletedClub) {
            return NextResponse.json({ message: 'Club not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Club deleted successfully', club: deletedClub });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting club', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}