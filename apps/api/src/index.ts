import Fastify from 'fastify';
import { z } from 'zod';
import { createDb } from './db.js';
import { loadEnv } from './env.js';
import { logger } from './logger.js';

const env = loadEnv();
const db = createDb(env.DATABASE_URL);

const app = Fastify({ logger });
await app.register(import('./auth.js'), { databaseUrl: env.DATABASE_URL });

app.get('/health', async () => ({ status: 'ok', db: true }));

app.post('/echo', async (request, reply) => {
  const schema = z.object({ message: z.string() });
  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    reply.code(400);
    return { error: parsed.error.flatten() };
  }
  await db.healthNote('echo');
  return { message: parsed.data.message };
});

app.post('/secure/ping', async (request, reply) => {
  const apiKey = request.headers['x-api-key'];
  const ok = await app.verifyApiKey(typeof apiKey === 'string' ? apiKey : undefined);
  if (!ok) {
    reply.code(401);
    return { error: 'unauthorized' };
  }
  return { status: 'ok' };
});

const port = env.PORT;

app
  .listen({ port, host: '0.0.0.0' })
  .then(() => {
    app.log.info(`api ready on :${port}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });

const shutdown = async () => {
  await db.pool.end();
  await app.close();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
