// Verifies user is logged inx
import { Role } from "@prisma/client";
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== Role.SUPERADMIN) {
    return NextResponse.redirect(new URL('/views/event', req.url))
  }
});

// Veraifies for logged in for these paths only
export const config = { matcher: ['/views/:path*', '/admin/:path*'] }