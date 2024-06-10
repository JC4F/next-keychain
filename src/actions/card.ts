"use server";

import { handleResponse } from "@/lib";
import db from "@/lib/database/db";
import { CardTable } from "@/lib/database/types";
import { jsonObjectFrom } from "kysely/helpers/postgres";
import { revalidatePath } from "next/cache";

export async function fetchCards(userId: string) {
  try {
    const cards = await db
      .selectFrom("Card")
      .where("userId", "=", userId)
      .select((eb) => [
        "id",
        "productId",
        "userId",
        "quantity",
        "created_at",
        jsonObjectFrom(
          eb
            .selectFrom("Product")
            .selectAll()
            .whereRef("Product.id", "=", "Card.productId")
        ).as("product"),
      ])
      .execute();

    return handleResponse<any[]>(
      true,
      "Fetch card success!",
      cards,
      cards.length
    );
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Fetch card fail!", null);
  }
}

export async function fetchCardById(id: string) {
  try {
    const card = (await db
      .selectFrom("Card")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst()) as CardTable;

    return handleResponse<CardTable>(true, "Fetch card success!", card);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Fetch card fail!", null);
  }
}

export async function createCard(data: any) {
  try {
    const oldCard = await db
      .selectFrom("Card")
      .where("userId", "=", data.userId)
      .where("productId", "=", data.productId)
      .selectAll()
      .executeTakeFirst();

    if (oldCard)
      await db
        .updateTable("Card")
        .where("userId", "=", data.userId)
        .where("productId", "=", data.productId)
        .set({
          quantity: oldCard.quantity + data.quantity,
        })
        .execute();
    else await db.insertInto("Card").values(data).execute();
    revalidatePath("/card");

    return handleResponse(true, "Create card success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Create card fail!", null);
  }
}

export async function editCard(id: string, data: any) {
  try {
    await db.updateTable("Card").set(data).where("id", "=", id).execute();

    return handleResponse(true, "Edit card success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Edit card fail!", null);
  }
}

export async function deleteCard(id: string) {
  try {
    await db.deleteFrom("Card").where("id", "=", id).execute();

    return handleResponse(true, "Delete card success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Delete card fail!", null);
  }
}
