import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'

export async function middleware(request: NextRequest) {
  // Let Auth0 handle its own routes
  const authResponse = await auth0.middleware(request)

  // For /travel routes (except public map), check authentication
  if (request.nextUrl.pathname.startsWith('/travel')) {
    // Allow the public map without auth
    if (request.nextUrl.pathname === '/travel/map') {
      return authResponse
    }

    // Get session from the auth response
    const session = await auth0.getSession(request)
    if (!session) {
      // Redirect to Auth0 login
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('returnTo', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return authResponse
}

export const config = {
  matcher: [
    // Auth0 routes
    '/auth/:path*',
    // Travel routes to protect
    '/travel/:path*',
  ],
}

