// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Logged out" },
    { status: 200 }
  );
  
  // Clear the cookie
  response.cookies.set('auth', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  
  return response;
}