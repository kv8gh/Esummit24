import { NextResponse } from 'next/server'
 
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/events/event1')) {

    // return NextResponse.rewrite(new URL('/about-2', request.url))
  }

}