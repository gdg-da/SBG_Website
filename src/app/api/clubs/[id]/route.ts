import { connectDB } from '@/lib/mongodb';
import Club from '@/models/Club';
import { NextResponse } from 'next/server';
import { checkSBGAccess } from '@/lib/authUtils';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const club = await Club.findOne({ id: params.id });

        if (!club) {
            return NextResponse.json(
                { message: 'Club not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(club);
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching club', error },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const hasAccess = await checkSBGAccess();
    if (!hasAccess) {
        return NextResponse.json(
            { message: 'Unauthorized: Only SBG can update clubs' },
            { status: 403 }
        );
    }

    try {
        await connectDB();
        const body = await request.json();

        const updatedClub = await Club.findOneAndUpdate(
            { id: params.id },
            body,
            { new: true }
        );

        if (!updatedClub) {
            return NextResponse.json(
                { message: 'Club not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedClub);
    } catch (error) {
        return NextResponse.json(
            { message: 'Error updating club', error },
            { status: 500 }
        );
    }
}