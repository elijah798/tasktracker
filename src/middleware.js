import {NextResponse} from 'next/server'

export function middleware(request) {
    console.log("Middleware");
    return NextResponse.redirect(new URL('/dashboard', request.url))
}
