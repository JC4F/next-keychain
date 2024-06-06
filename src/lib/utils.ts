import { ROLE, RouteWithRoles } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { sql } from "kysely";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function enumHelper(...args: string[]) {
  return sql`enum(${sql.join(args.map(sql.lit))})`;
}

export const locales = ["en", "vn"] as const;
export const startRegexRoute = `(${locales
  .map((locale) => `\\/${locale}`)
  .join("|")}|\\/)?`;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

export const findRolesForPath = (inputPath: string): ROLE[] | null => {
  const route = RouteWithRoles.find((route) => {
    const regex = new RegExp(
      `^${startRegexRoute}${route.path !== "/" ? route.path : ""}$`
    );
    return regex.test(inputPath);
  });

  return route ? route.roles : null;
};
