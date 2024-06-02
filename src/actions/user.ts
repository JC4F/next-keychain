"use server";

import { handleResponse } from "@/lib";
import db from "@/lib/database/db";
import { UserTable } from "@/lib/database/types";

export async function fetchUsers() {
  try {
    const users = (await db
      .selectFrom("User")
      .selectAll()
      .execute()) as UserTable[];

    return handleResponse<UserTable[]>(
      true,
      "Fetch user success!",
      users,
      users.length
    );
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Fetch user fail!", null);
  }
}

export async function fetchUserByEmail(email: string) {
  try {
    const user = (await db
      .selectFrom("User")
      .where("email", "=", email)
      .selectAll()
      .executeTakeFirst()) as UserTable;

    return handleResponse<UserTable>(true, "Fetch user success!", user);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Fetch user fail!", null);
  }
}

export async function createUser(data: any) {
  try {
    await db.insertInto("User").values(data).execute();

    return handleResponse(true, "Create user success!", null);
  } catch (error) {
    console.log(error);
    return handleResponse(false, "Create user fail!", null);
  }
}
