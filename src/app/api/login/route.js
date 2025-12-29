import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // Response create karo aur cookie set karo
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set({
      name: "auth",
      value: "true",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24, // 1 day
      path: "/", // important
    });

    return response;
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }
}
