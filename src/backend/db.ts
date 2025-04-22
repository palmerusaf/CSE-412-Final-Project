import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { createTbleSqlRaw } from "./createTbleSqlRaw";
import { projects } from "./schema";

const client = new PGlite("idb://my-pgdata");

if (import.meta.env.DEV) indexedDB.deleteDatabase("my-pgdata");

client.exec(createTbleSqlRaw);
await client.waitReady;
const db = drizzle({ client });

async function newProject({ name }: typeof projects.$inferInsert) {
  return await db.insert(projects).values({ name });
}

async function getProjects() {
  return await db.select().from(projects);
}
