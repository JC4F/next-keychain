"use server";

import { handleResponse } from "@/lib";
import db from "@/lib/database/db";
import { ProductTable } from "@/lib/database/types";

export async function fetchProduct() {
  try {
    const products = (await db
      .selectFrom("Product")
      .selectAll()
      .execute()) as ProductTable[];

    return handleResponse<ProductTable[]>(
      true,
      "Fetch product success!",
      products,
      products.length
    );
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Fetch product fail!", null);
  }
}

export async function createProduct(data: any) {
  try {
    await db.insertInto("Product").values(data).execute();

    return handleResponse(true, "Create product success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Create product fail!", null);
  }
}
