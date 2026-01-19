import type { NextRequest } from 'next/server'
import { auth0 } from '@/lib/auth0'

export async function middleware(request: NextRequest) {
  // Let Auth0 handle its own routes
  const authResponse = await auth0.middleware(request)
  return authResponse
}

export const config = {
  matcher: [
    // Auth0 routes only
    '/auth/:path*',
  ],
}

