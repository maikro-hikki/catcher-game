import { Database } from "./types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import dot from "dotenv";

dot.config();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_NAME,
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
