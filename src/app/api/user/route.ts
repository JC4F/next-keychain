import { ROLE } from "@/constants";
import db from "@/lib/database/db";
import { UserTable } from "@/lib/database/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const user = (await db
    .selectFrom("User")
    .where("email", "=", email)
    .selectAll()
    .executeTakeFirst()) as UserTable;

  return Response.json({ data: user || null });
}

export async function POST(request: Request) {
  const data = await request.json();
  await db
    .insertInto("User")
    //@ts-ignore
    .values({
      email: data.email,
      role: ROLE.USER,
      image: data.image,
      name: data.name,
    })
    .executeTakeFirst();

  const user = (await db
    .selectFrom("User")
    .where("email", "=", data.email)
    .selectAll()
    .executeTakeFirst()) as UserTable;

  return Response.json({ data: user || null });
}
