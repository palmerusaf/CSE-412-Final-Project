import { pgTable, integer, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer(),
  first_name: varchar().notNull(),
});
