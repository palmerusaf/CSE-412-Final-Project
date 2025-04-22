import * as t from "drizzle-orm/pg-core";

export const projects = t.pgTable("projects", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
});

export const todos = t.pgTable("todos", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  title: t.text().notNull(),
  description: t.text(),
  completed: t.boolean().default(false).notNull(),
  projectId: t
    .integer()
    .references(() => projects.id)
    .notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
});
