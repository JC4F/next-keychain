// import { KyselyAuth } from "@auth/kysely-adapter";
import * as dotenv from "dotenv";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./types";

dotenv.config({ path: ".env" });

// const dialect = new PostgresDialect({
//   pool: new Pool({
//     database: process.env.DB_DATABASE,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     port: Number(process.env.DB_PORT),
//     max: 10,
//   }),
// });

console.log(process.env.NODE_ENV, process.env.DATABASE_URL);

// export const db = createKysely<Database>({
//   connectionString: process.env.POSTGRES_URL,
// });

const dbClientSingleton = () => {
  return new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
      }),
    }),
  }) as Kysely<Database>;
};

declare global {
  var db: undefined | Kysely<Database>;
}

const db = globalThis.db ?? dbClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.db = db;

export default db;
