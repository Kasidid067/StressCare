import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const user = req.auth?.user;

  const pathname = req.nextUrl.pathname;

  // ยังไม่ Login
  if (!user) {
    return NextResponse.redirect(
      new URL("/auth/login", req.url)
    );
  }

  // Admin
  if (
    pathname.startsWith("/admin") &&
    user.role !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  // Staff
  if (
    pathname.startsWith("/staff") &&
    user.role !== "STAFF"
  ) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  // Advisor
  if (
    pathname.startsWith("/advisor") &&
    user.role !== "ADVISOR"
  ) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  // Student
  if (
    pathname.startsWith("/student") &&
    user.role !== "STUDENT"
  ) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/student/:path*",
    "/advisor/:path*",
    "/staff/:path*",
    "/admin/:path*",
  ],
};