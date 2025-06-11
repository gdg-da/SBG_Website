import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const isGDG = email === process.env.GDG_EMAIL;
  const isSBG = email === process.env.SBG_EMAIL;
  return Response.json({ isAuthorized: isGDG || isSBG });
}