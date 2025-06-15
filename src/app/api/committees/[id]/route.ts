import { NextRequest, NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
import { verifyFirebaseToken, isAuthorizedUser } from '@/lib/firebaseAdmin';
import Committee from '@/models/Committee';

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.pathname.split('/').pop();
        await connectDB();
        const committee = await Committee.findOne({ id: id });

        if (!committee) {
            return NextResponse.json({ message: 'Committee not found' }, { status: 404 });
        }

        return NextResponse.json(committee);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching committee', error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const id = request.nextUrl.pathname.split('/').pop();
        const body = await request.json();
        const { idToken, ...committeeData } = body;

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
            return NextResponse.json({ message: 'Unauthorized: Only SBG can update committees' }, { status: 403 });
        }

        await connectDB();

        const updatedCommittee = await Committee.findOneAndUpdate({ id: id }, committeeData, { new: true });

        if (!updatedCommittee) {
            return NextResponse.json({ message: 'Committee not found' }, { status: 404 });
        }

        return NextResponse.json(updatedCommittee);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating committee', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}