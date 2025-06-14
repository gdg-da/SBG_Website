import { NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
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