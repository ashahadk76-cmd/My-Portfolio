import { NextResponse } from "next/server";

export function middleware(request) {
    const url = request.nextUrl.clone();
    const authCookie = request.cookies.get("auth");
    if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
        if (authCookie?.value !== "true") {
            url.pathname = "/admin/login"; return NextResponse.redirect(url);
        }
    }
    if (url.pathname === "/admin/login" && authCookie?.value === "true") {
        url.pathname = "/admin/dashboard";
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}