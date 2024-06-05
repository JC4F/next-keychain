import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";
import { findRolesForPath } from "./lib";

export default auth((req) => {
  const session = req.auth;
  const response = NextResponse.next();
  const pathName = req.nextUrl.pathname;
  const defaultLocale = req.headers.get("x-your-custom-locale") || "en";

  const roles = findRolesForPath(pathName);

  if (!roles) return NextResponse.rewrite(new URL("/not-found", req.url));

  // route with no require role ~ public
  if (roles.length === 0) return response;

  // no public, require authenticated
  if (!session?.user) {
    return NextResponse.redirect(new URL(`/${defaultLocale}/product`, req.url));
  }

  if (!roles.includes(session?.user?.role))
    return NextResponse.rewrite(new URL("/not-found", req.url));

  return response;
});

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
