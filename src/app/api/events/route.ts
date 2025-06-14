import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
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
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const isSBG = email === process.env.SBG_EMAIL;

    if (!isSBG) {
        return NextResponse.json({ message: 'Unauthorized: Only SBG can update clubs' }, { status: 403 });
    }

    try {
        await connectDB();

        const body = await request.json();
        const event = new Event(body);
        await event.save();

        return NextResponse.json({ message: "Event created successfully", event }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}