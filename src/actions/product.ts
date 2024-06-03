"use server";

import { handleResponse } from "@/lib";
import db from "@/lib/database/db";
import { ProductTable } from "@/lib/database/types";

export async function fetchProducts() {
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

export async function fetchProductById(id: string) {
  try {
    const product = (await db
      .selectFrom("Product")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst()) as ProductTable;

    return handleResponse<ProductTable>(
      true,
      "Fetch product success!",
      product
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

export async function editProduct(id: string, data: any) {
  try {
    await db.updateTable("Product").set(data).where("id", "=", id).execute();

    return handleResponse(true, "Edit product success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Edit product fail!", null);
  }
}

export async function DeleteProduct(id: string) {
  try {
    await db.deleteFrom("Product").where("id", "=", id).execute();

    return handleResponse(true, "Delete product success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Delete product fail!", null);
  }
}
