import { NextRequest, NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
import { verifyFirebaseToken, isAuthorizedUser } from '@/lib/firebaseAdmin';
import Committee from '@/models/Committee';

export async function GET() {
    try {
        await connectDB();
        const committees = await Committee.find().sort({ name: 1 });
        
        return NextResponse.json(committees);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching committees', error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
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
            return NextResponse.json({ message: 'Unauthorized: Only SBG can create committees' }, { status: 403 });
        }

        await connectDB();

        const lastCommittee = await Committee.findOne().sort({ id: -1 });
        const nextId = lastCommittee ? lastCommittee.id + 1 : 1;

        const newCommittee = new Committee({
            ...committeeData,
            id: nextId
        });

        await newCommittee.save();

        return NextResponse.json(newCommittee, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating committee', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { idToken, committeeId } = body;

        if (!idToken) {
            return NextResponse.json({ message: 'Authentication token required' }, { status: 401 });
        }

        if (!committeeId) {
            return NextResponse.json({ message: 'Committee ID required' }, { status: 400 });
        }

        let decodedToken;

        try {
            decodedToken = await verifyFirebaseToken(idToken);
        } catch {
            return NextResponse.json({ message: 'Invalid authentication token' }, { status: 401 });
        }

        if (!isAuthorizedUser(decodedToken.email)) {
            return NextResponse.json({ message: 'Unauthorized: Only SBG can delete committees' }, { status: 403 });
        }

        await connectDB();

        const deletedCommittee = await Committee.findOneAndDelete({ id: committeeId });

        if (!deletedCommittee) {
            return NextResponse.json({ message: 'Committee not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Committee deleted successfully', committee: deletedCommittee });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting committee', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}