import { type ClassValue, clsx } from "clsx"
import { sql } from "kysely"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function enumHelper(...args: string[]) {
  return sql`enum(${sql.join(args.map(sql.lit))})`
}