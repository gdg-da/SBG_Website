export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const isSBG = email === process.env.SBG_EMAIL;
    return Response.json({ isAuthorized: isSBG });
}