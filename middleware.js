// middleware.js (ROOT folder - next to package.json)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Get auth cookie
  const authCookie = request.cookies.get('auth');
  const isAuthenticated = authCookie?.value === 'true';
  
  // ALLOW these routes without authentication
  const publicRoutes = [
    '/',
    '/about', 
    '/contact', 
    '/projects', 
    '/skills',
    '/api/query'
  ];
  
  // Check if current path is public
  if (publicRoutes.includes(pathname) || pathname.startsWith('/api/query')) {
    return NextResponse.next();
  }
  
  // Allow login page and login API
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }
  
  if (pathname === '/api/login') {
    return NextResponse.next();
  }
  
  // PROTECT EVERYTHING ELSE that starts with /admin
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/login',
    '/api/query',
  ],
};