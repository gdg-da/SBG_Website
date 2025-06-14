import { NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
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