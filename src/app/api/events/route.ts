import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyFirebaseToken, isAuthorizedUser } from '@/lib/firebaseAdmin';
import Event from "@/models/Event";

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find({});

        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { idToken, ...eventData } = body;

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
            return NextResponse.json({ message: 'Unauthorized: Only SBG can create events' }, { status: 403 });
        }

        await connectDB();

        const event = new Event(eventData);
        await event.save();

        return NextResponse.json({ message: "Event created successfully", event }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { idToken, eventId } = body;

        if (!idToken) {
            return NextResponse.json({ message: 'Authentication token required' }, { status: 401 });
        }

        if (!eventId) {
            return NextResponse.json({ message: 'Event ID is required' }, { status: 400 });
        }

        let decodedToken;

        try {
            decodedToken = await verifyFirebaseToken(idToken);
        } catch {
            return NextResponse.json({ message: 'Invalid authentication token' }, { status: 401 });
        }

        if (!isAuthorizedUser(decodedToken.email)) {
            return NextResponse.json({ message: 'Unauthorized: Only SBG can delete events' }, { status: 403 });
        }

        await connectDB();

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return NextResponse.json({ message: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({ message: "Event deleted successfully", eventId }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}