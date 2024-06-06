import { auth } from "@/lib/auth/auth";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { findRolesForPath, locales } from "./lib";

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
});

function IntlMiddleware(req: NextRequest) {
  const defaultLocale = req.headers.get("x-your-custom-locale") || "en";

  const response = intlMiddleware(req);
  response.headers.set("x-your-custom-locale", defaultLocale);
  response.headers.set("x-pathname", req.nextUrl.pathname);

  return response;
}

export default auth((req) => {
  const session = req.auth;
  const response = NextResponse.next();
  const pathName = req.nextUrl.pathname;
  const defaultLocale = req.headers.get("x-your-custom-locale") || "en";

  const roles = findRolesForPath(pathName);

  // page not found
  if (!roles) return NextResponse.rewrite(new URL("/not-found", req.url));

  // route with no require role ~ public
  if (roles.length === 0) return IntlMiddleware(req);

  // no public, require authenticated
  if (!session?.user) {
    return NextResponse.redirect(new URL(`/${defaultLocale}/product`, req.url));
  }

  if (!roles.includes(session?.user?.role))
    return NextResponse.rewrite(new URL("/not-found", req.url));

  return IntlMiddleware(req);
});

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
