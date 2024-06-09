"use server";

import { ROLE } from "@/constants";
import { handleResponse } from "@/lib";
import db from "@/lib/database/db";
import { OrderTable } from "@/lib/database/types";
import { jsonObjectFrom } from "kysely/helpers/postgres";

export async function fetchOrders(userId: string, role: ROLE) {
  try {
    let orders;
    if (role === ROLE.ADMIN) {
      orders = await db
        .selectFrom("Order")
        .where("isCheckout", "=", true)
        .select((eb) => [
          "id",
          "userId",
          "address",
          "created_at",
          "totalPrice",
          "isCheckout",
          jsonObjectFrom(
            eb
              .selectFrom("User")
              .selectAll()
              .whereRef("User.id", "=", "Order.userId")
          ).as("user"),
        ])
        .execute();
    } else {
      orders = await db
        .selectFrom("Order")
        .where("userId", "=", userId)
        .where("isCheckout", "=", true)
        .select((eb) => [
          "id",
          "userId",
          "address",
          "created_at",
          "totalPrice",
          "isCheckout",
          jsonObjectFrom(
            eb
              .selectFrom("User")
              .selectAll()
              .whereRef("User.id", "=", "Order.userId")
          ).as("user"),
        ])
        .execute();
    }

    return handleResponse(true, "Fetch order success!", orders, orders.length);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Fetch order fail!", null);
  }
}

export async function fetchOrderById(id: string) {
  try {
    const order = (await db
      .selectFrom("Order")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst()) as OrderTable;

    return handleResponse<OrderTable>(true, "Fetch order success!", order);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Fetch order fail!", null);
  }
}

export async function createOrder(data: any) {
  try {
    await db.insertInto("Order").values(data).execute();

    return handleResponse(true, "Create order success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Create order fail!", null);
  }
}

export async function editOrder(id: string, data: any) {
  try {
    await db.updateTable("Order").set(data).where("id", "=", id).execute();

    return handleResponse(true, "Edit order success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Edit order fail!", null);
  }
}

export async function deleteOrder(id: string) {
  try {
    await db.deleteFrom("Order").where("id", "=", id).execute();

    return handleResponse(true, "Delete order success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Delete order fail!", null);
  }
}
