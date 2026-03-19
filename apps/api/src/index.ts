import Fastify from 'fastify';
import { z } from 'zod';

const app = Fastify({ logger: true });

app.get('/health', async () => ({ status: 'ok' }));

app.post('/echo', async (request, reply) => {
  const schema = z.object({ message: z.string() });
  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    reply.code(400);
    return { error: parsed.error.flatten() };
  }
  return { message: parsed.data.message };
});

const port = Number(process.env.PORT || 3000);

app
  .listen({ port, host: '0.0.0.0' })
  .then(() => {
    app.log.info(`api ready on :${port}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
