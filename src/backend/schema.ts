import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export const projects = t.pgTable("projects", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
});

export const todos = t.pgTable(
  "todos",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    title: t.text().notNull(),
    description: t.text(),
    completed: t.boolean().default(false).notNull(),
    projectId: t
      .integer()
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: t.timestamp().defaultNow().notNull(),
  },
  (table) => [
    t.index("created_index").on(table.createdAt),
    t
      .index("todo_search_index")
      .using(
        "gin",
        sql`to_tsvector('english',${table.title} || ' ' || ${table.description})`,
      ),
  ],
);
