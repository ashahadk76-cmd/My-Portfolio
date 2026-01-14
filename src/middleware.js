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


         
     
    if (url.pathname === "/api/query" && authCookie?.value !== "true") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (url.pathname === "/api/project" && authCookie?.value !== "true") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (url.pathname === "/api/replay" && authCookie?.value !== "true") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


    return NextResponse.next();
}