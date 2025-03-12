import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/app/models/Event";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const event = new Event(body);
    await event.save();

    return NextResponse.json({ message: "Event created successfully", event }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
    try {
      await connectDB();
      
      const events = await Event.find({}); // Fetch all events
      return NextResponse.json(events, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
  }
