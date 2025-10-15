import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
  
  if (isAdminPath && !isLoginPage && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}