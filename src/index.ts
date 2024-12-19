import { Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { getPrisma } from './lib/prismaFunctin.js'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

app.use(etag(), logger())

app.get('/', (c) => c.json({
  "text": "Hello World"
}))

app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

app.post('/', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
})

export default app
