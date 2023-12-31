import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get('path') || '/'
    const secret = request.nextUrl.searchParams.get('secret')
    
    if (secret !== process.env.MY_SECRET_KEY) {
        return new NextResponse(
            JSON.stringify({ error: 'Invalid Token' }),
            {
                status: 401,
                statusText: 'Unauthorized',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }

    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
}