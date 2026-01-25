import { NextResponse } from "next/server";

export function middleware(request) {
    const url = request.nextUrl.clone();
    const authCookie = request.cookies.get("auth");

    // Protect admin panel
    if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
        if (authCookie?.value !== "true") {
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }
    }

    if (url.pathname === "/admin/login" && authCookie?.value === "true") {
        url.pathname = "/admin/dashboard";
        return NextResponse.redirect(url);
    }

    // Protect sensitive API routes
    if (
        url.pathname.startsWith("/api/query") ||
        url.pathname.startsWith("/api/replay") ||
        url.pathname.startsWith("/api/project")
    ) {
        if (request.method === "GET" && authCookie?.value !== "true") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/api/query/:path*",
        "/api/replay/:path*",
        "/api/project/:path*",
    ],
};
