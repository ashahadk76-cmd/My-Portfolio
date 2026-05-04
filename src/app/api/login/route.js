// app/api/login/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Your credentials
    const validEmail = "ashahadkhanind@gmail.com";
    const validPassword = "Ashahad2006";

    if (email === validEmail && password === validPassword) {
      // Create response with success message
      const response = NextResponse.json(
        { success: true, message: "Login successful" },
        { status: 200 }
      );

      // Set the cookie - CRITICAL PART
      response.cookies.set('auth', 'true', {
        httpOnly: true,
        secure: false, // false for localhost
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}