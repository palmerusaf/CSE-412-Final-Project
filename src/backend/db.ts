import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { createTbleSqlRaw } from "./createTbleSqlRaw";
import { projects, todos } from "./schema";
import { and, eq, gte, lt, sql } from "drizzle-orm";

const client = new PGlite("idb://my-pgdata");

if (import.meta.env.DEV) indexedDB.deleteDatabase("my-pgdata");

client.exec(createTbleSqlRaw);
const db = drizzle({ client });

export function useDelProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => db.delete(projects).where(eq(projects.id, id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useNewProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name }: typeof projects.$inferInsert) =>
      db.insert(projects).values({ name }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useGetProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => db.select().from(projects),
  });
}

export function useNewTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      title,
      projectId,
      description,
    }: typeof todos.$inferInsert) =>
      db.insert(todos).values({ title, projectId, description }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => db.delete(todos).where(eq(todos.id, id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export function useGetTodos(projectId: number) {
  return useQuery({
    queryKey: ["todos", projectId],
    queryFn: () =>
      db.select().from(todos).where(eq(todos.projectId, projectId)),
  });
}

export function useGetTodosToday(projectId: number) {
  return useQuery({
    queryKey: ["todos_today", projectId],
    queryFn: () =>
      db
        .select()
        .from(todos)
        .where(
          and(
            gte(todos.createdAt, sql`CURRENT_DATE`),
            lt(todos.createdAt, sql`CURRENT_DATE + INTERVAL '1 day'`),
          ),
        ),
  });
}
