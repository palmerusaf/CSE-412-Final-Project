import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { users } from "./schema";
import { createTbleSqlRaw } from "./createTbleSqlRaw";

const client = new PGlite("idb://my-pgdata");
client.exec(createTbleSqlRaw);
await client.waitReady;
const db = drizzle({ client });
export async function test(input: string) {
  await db.insert(users).values({ first_name: input });
  const res = await db.select().from(users);
  await db.delete(users);
  return res;
}
