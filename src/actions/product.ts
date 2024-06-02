"use server";

import db from "@/lib/database/db";

export async function createProduct(data: any) {
  console.log(db);
  try {
    const result = await db.selectFrom("Product").execute();
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
