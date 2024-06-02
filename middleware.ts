import authConfig from "@/lib/auth/auth.config";
import NextAuth from "next-auth";

export const middleware = NextAuth(authConfig).auth;

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
