import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyFirebaseToken, isAuthorizedUser } from '@/lib/firebaseAdmin';
import Announcement from "@/models/Announcement";

export async function GET() {
    try {
        await connectDB();

        const announcements = await Announcement.find({}).sort({ createdAt: -1 });

        return NextResponse.json(announcements, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { idToken, ...announcementData } = body;

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
            return NextResponse.json({ message: 'Unauthorized: Only SBG can create announcements' }, { status: 403 });
        }

        await connectDB();

        const announcement = new Announcement(announcementData);
        await announcement.save();

        return NextResponse.json({ message: "Announcement created successfully", announcement }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { idToken, announcementId } = body;

        if (!idToken) {
            return NextResponse.json({ message: 'Authentication token required' }, { status: 401 });
        }

        if (!announcementId) {
            return NextResponse.json({ message: 'Announcement ID is required' }, { status: 400 });
        }

        let decodedToken;

        try {
            decodedToken = await verifyFirebaseToken(idToken);
        } catch {
            return NextResponse.json({ message: 'Invalid authentication token' }, { status: 401 });
        }

        if (!isAuthorizedUser(decodedToken.email)) {
            return NextResponse.json({ message: 'Unauthorized: Only SBG can delete announcements' }, { status: 403 });
        }

        await connectDB();

        const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);

        if (!deletedAnnouncement) {
            return NextResponse.json({ message: 'Announcement not found' }, { status: 404 });
        }

        return NextResponse.json({ message: "Announcement deleted successfully", announcementId }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}