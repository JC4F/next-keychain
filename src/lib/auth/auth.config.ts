import { ROLE } from "@/constants";
import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        return !!profile?.email_verified;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        const userDbRes = await fetch(
          `${process.env.APP_URL}/api/user?email=` + user.email
        );
        const userDb = await userDbRes.json();

        if (userDb.data) {
          token.role = userDb.data.role;
          token.id = userDb.data.id;
        } else {
          const userDbTmpRes = await fetch(`${process.env.APP_URL}/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          const userDbTmp = await userDbTmpRes.json();
          token.role = userDb.data.role;
          token.id = userDb.data.id;
        }
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as ROLE;
      return session;
    },
  },
} satisfies NextAuthConfig;
