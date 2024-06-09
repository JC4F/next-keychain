"use server";

import { handleResponse } from "@/lib";
import db from "@/lib/database/db";
import { ProductTable } from "@/lib/database/types";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    const product = await stripe.products.create({
      name: data.title,
      description: data.description,
      images: data.images,
      default_price_data: {
        unit_amount: data.price,
        currency: "usd",
      },
      expand: ["default_price"],
    });

    await db
      .insertInto("Product")
      .values({
        ...data,
        externalPriceId: (product?.default_price as Stripe.Price)?.id,
        externalProductId: product.id,
      })
      .execute();

    return handleResponse(true, "Create product success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Create product fail!", null);
  }
}

export async function editProduct(id: string, data: any) {
  try {
    await stripe.products.del(data.externalProductId);
    const product = await stripe.products.create({
      name: data.title,
      description: data.description,
      images: data.images,
      default_price_data: {
        unit_amount: data.price,
        currency: "usd",
      },
      expand: ["default_price"],
    });

    await db
      .updateTable("Product")
      .set({
        ...data,
        externalPriceId: (product?.default_price as Stripe.Price)?.id,
        externalProductId: product.id,
      })
      .where("id", "=", id)
      .execute();

    return handleResponse(true, "Edit product success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Edit product fail!", null);
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = (await db
      .selectFrom("Product")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst()) as ProductTable;

    await stripe.products.del(product.externalProductId);
    await db.deleteFrom("Product").where("id", "=", id).execute();

    return handleResponse(true, "Delete product success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Delete product fail!", null);
  }
}
