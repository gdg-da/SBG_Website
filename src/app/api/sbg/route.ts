import { NextRequest, NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
import { verifyFirebaseToken, isAuthorizedUser } from '@/lib/firebaseAdmin';
import SBG from '@/models/SBG';

export async function GET() {
    try {
        await connectDB();
        const sbg = await SBG.findOne({ id: 1 });

        if (!sbg) {
            return NextResponse.json({ message: 'SBG data not found' }, { status: 404 });
        }

        return NextResponse.json(sbg);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching SBG data', error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { idToken, ...sbgData } = body;

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
            return NextResponse.json({ message: 'Unauthorized: Only SBG can update SBG data' }, { status: 403 });
        }

        await connectDB();

        const updatedSBG = await SBG.findOneAndUpdate({ id: 1 }, sbgData, { new: true, upsert: true });

        return NextResponse.json(updatedSBG);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating SBG data', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { idToken, ...sbgData } = body;

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
            return NextResponse.json({ message: 'Unauthorized: Only SBG can create SBG data' }, { status: 403 });
        }

        await connectDB();

        await SBG.deleteMany({});

        const newSBG = new SBG({ id: 1, ...sbgData });

        await newSBG.save();

        return NextResponse.json(newSBG, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating SBG data', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}