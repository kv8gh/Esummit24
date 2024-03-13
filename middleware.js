import { NextResponse } from 'next/server'
 
export function middleware(request) {
  console.log('asdfasdfasdf', request.nextUrl.pathname)
  if (request.nextUrl.pathname.startsWith('/events/event1')) {

    // return NextResponse.rewrite(new URL('/about-2', request.url))
  }

}