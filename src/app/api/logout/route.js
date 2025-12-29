import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );
    response.cookies.set({
    name: "auth",
    value: "",
    httpOnly: true,
    secure: true,
    maxAge: 0, // Expire the cookie immediately 
    path: "/", // important
  });
    return response;
}   