import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { createTbleSqlRaw } from "./createTbleSqlRaw";

const client = new PGlite("idb://my-pgdata");

if (import.meta.env.DEV) indexedDB.deleteDatabase("my-pgdata");

client.exec(createTbleSqlRaw);
await client.waitReady;
const db = drizzle({ client });
