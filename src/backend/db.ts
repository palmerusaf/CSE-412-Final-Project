import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { createTbleSqlRaw } from "./createTbleSqlRaw";
import { projects } from "./schema";

const client = new PGlite("idb://my-pgdata");

if (import.meta.env.DEV) indexedDB.deleteDatabase("my-pgdata");

client.exec(createTbleSqlRaw);
await client.waitReady;
const db = drizzle({ client });

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
