import type { NextRequest } from 'next/server'
import { auth0 } from '@/lib/auth0'

// The Auth0 SDK implements its own routing inside `auth0.middleware()`,
// including /auth/login, /auth/logout, /auth/callback, etc.
export async function GET(request: NextRequest) {
  return await auth0.middleware(request)
}

