import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import {todos} from "../db/schema"
import { eq } from "drizzle-orm";

const app = new Hono<{Bindings: Bindings}>().basePath("/api");

app.get("/todos", async (c) => {
	try {
		const db = drizzle(c.env.DB);
		const results = await db.select().from(todos)
		return c.json(results)
	} catch(e) {
		return c.json({err: e}, 500)
	}
})

app.post("/todos/:id", async (c) => {
	const id = parseInt(c.req.param("id"))
	try {
		const db = drizzle(c.env.DB);
		const resutls =  db.select().from(todos).where(eq(todos.id, id));
		return c.json(resutls)
	} catch(e) {
		return c.json({err: e}, 500)
	}
})

app.post("/todos", async (c) => {
	const todo = await c.req.json<typeof todos.$inferInsert>()
	try {
		const db = drizzle(c.env.DB);
		await db.insert(todos).values(todo)
		return c.json({message: "Success"}, 201)
	} catch(e) {
		return c.json({err: e}, 500)
	}
})

app.put("/todos/:id", async (c) => {
	const id = await parseInt(c.req.param("id"))
	const {todo, score, isDone} = await c.req.json<typeof todos.$inferInsert>()
	try {
		const db = drizzle(c.env.DB)
		await db.update(todos).set({todo, score, isDone}).where(eq(todos.id, id))
		return c.json({message: "Success"}, 200)
	} catch(e) {
		return c.json({error: e}, 500)
	}
})

app.delete("/todos/:id", async (c) => {
	const id = parseInt(c.req.param("id"))
	try {
		const db = drizzle(c.env.DB);
		await db.delete(todos).where(eq(todos.id, id));
		return c.json({message: "Success"}, 200)
	} catch(e) {
		return c.json({err: e}, 500)
	}
})

export default app;
