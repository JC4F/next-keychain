import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: KyselyAdapter(db as any) as any,
  ...authConfig,
});
