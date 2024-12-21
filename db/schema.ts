import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: integer("id", {mode: "number"}).primaryKey({autoIncrement: true}),
  todo: text("todo").notNull(),
  score: integer("score", {mode: "number"}).default(0),
  isDone: integer("is_done", {mode: "boolean"}).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})
