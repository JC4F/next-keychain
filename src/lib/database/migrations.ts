import { promises as fs } from "fs";
import { FileMigrationProvider, Kysely, Migrator, sql } from "kysely";
import path from "path";
import { PRODUCT_STATUS, ROLE } from "../../constants";
import db from "./db";
import { seedData } from "./seed";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createType("role").asEnum([ROLE.ADMIN, ROLE.USER]).execute();
  await db.schema
    .createType("product_status")
    .asEnum([
      PRODUCT_STATUS.ACTIVE,
      PRODUCT_STATUS.ARCHIVED,
      PRODUCT_STATUS.DRAFT,
    ])
    .execute();

  await db.schema
    .createTable("User")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("emailVerified", "timestamptz")
    .addColumn("image", "text")
    .addColumn("role", sql`role`)
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable("Product")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("externalProductId", "varchar", (col) => col.notNull())
    .addColumn("externalPriceId", "varchar", (col) => col.notNull())
    .addColumn("mainImage", "varchar", (col) => col.notNull())
    .addColumn("images", sql`text[]`, (col) => col.notNull())
    .addColumn("title", "varchar", (col) => col.notNull())
    .addColumn("description", "varchar", (col) => col.notNull())
    .addColumn("price", "numeric(8, 2)")
    .addColumn("quantity", "integer")
    .addColumn("status", sql`product_status`)
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp")
    .addColumn("deleted_at", "timestamp")
    .execute();

  await db.schema
    .createTable("Card")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("productId", "uuid", (col) =>
      col.references("Product.id").onDelete("cascade").notNull()
    )
    .addColumn("quantity", "integer")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp")
    .addColumn("deleted_at", "timestamp")
    .execute();

  await db.schema
    .createTable("Order")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("isCheckout", "boolean", (col) => col.defaultTo(false).notNull())
    .addColumn("address", "varchar", (col) => col.notNull())
    .addColumn("totalPrice", "numeric(8, 2)")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp")
    .addColumn("deleted_at", "timestamp")
    .execute();

  await db.schema
    .createTable("OrderItem")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("orderId", "uuid", (col) =>
      col.references("Order.id").onDelete("cascade").notNull()
    )
    .addColumn("cardId", "uuid", (col) =>
      col.references("Card.id").onDelete("set null")
    )
    .addColumn("mainImage", "varchar", (col) => col.notNull())
    .addColumn("images", sql`text[]`, (col) => col.notNull())
    .addColumn("title", "varchar", (col) => col.notNull())
    .addColumn("description", "varchar", (col) => col.notNull())
    .addColumn("price", "numeric(8, 2)")
    .addColumn("quantity", "integer")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp")
    .addColumn("deleted_at", "timestamp")
    .execute();

  await db.schema
    .createTable("Account")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("provider", "text", (col) => col.notNull())
    .addColumn("providerAccountId", "text", (col) => col.notNull())
    .addColumn("refresh_token", "text")
    .addColumn("access_token", "text")
    .addColumn("expires_at", "bigint")
    .addColumn("token_type", "text")
    .addColumn("scope", "text")
    .addColumn("id_token", "text")
    .addColumn("session_state", "text")
    .execute();

  await db.schema
    .createTable("Session")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("sessionToken", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("VerificationToken")
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("Account_userId_index")
    .on("Account")
    .column("userId")
    .execute();

  await db.schema
    .createIndex("Session_userId_index")
    .on("Session")
    .column("userId")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("Account").ifExists().execute();
  await db.schema.dropTable("Session").ifExists().execute();
  await db.schema.dropTable("VerificationToken").ifExists().execute();
  await db.schema.dropTable("Product").ifExists().execute();
  await db.schema.dropTable("User").ifExists().execute();
}

export async function executeMigration() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "../database"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  } else {
    await seedData();
  }

  await db.destroy();
}

executeMigration();
