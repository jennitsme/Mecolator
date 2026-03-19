import { createHash } from 'crypto';
import { FastifyPluginAsync } from 'fastify';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { apiKeys } from './schema.js';

function hashKey(key: string) {
  return createHash('sha256').update(key).digest('hex');
}

type AuthPluginOpts = {
  databaseUrl: string;
};

export const apiKeyAuthPlugin: FastifyPluginAsync<AuthPluginOpts> = async (fastify, opts) => {
  const pool = new Pool({ connectionString: opts.databaseUrl });
  const db = drizzle(pool);

  fastify.addHook('onClose', async () => {
    await pool.end();
  });

  fastify.decorate('verifyApiKey', async (rawKey: string | undefined) => {
    if (!rawKey) return false;
    const hashed = hashKey(rawKey);
    const [key] = await db
      .select({ id: apiKeys.id })
      .from(apiKeys)
      .where(apiKeys.hashedKey.eq(hashed))
      .limit(1);
    return Boolean(key);
  });
};

declare module 'fastify' {
  interface FastifyInstance {
    verifyApiKey: (rawKey: string | undefined) => Promise<boolean>;
  }
}
