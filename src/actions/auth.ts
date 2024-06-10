"use server";

import { signIn, signOut } from "@/lib/auth/auth";

export async function login() {
  return await signIn("google", {
    redirectTo: "/product",
  });
}

export async function logout() {
  return await signOut();
}
