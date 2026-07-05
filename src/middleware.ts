import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const pathname = req.nextUrl.pathname;
  const sessionCookie =
    req.cookies.get("authjs.session-token") ||
    req.cookies.get("__Secure-authjs.session-token");

  if (!sessionCookie && pathname.startsWith("/student")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!sessionCookie && pathname.startsWith("/advisor")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!sessionCookie && pathname.startsWith("/staff")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!sessionCookie && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/advisor/:path*",
    "/staff/:path*",
    "/admin/:path*",
  ],
};