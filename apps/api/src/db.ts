import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { healthChecks } from './schema.js';

export function createDb(connectionString: string) {
  const pool = new Pool({ connectionString });
  const db = drizzle(pool);

  async function healthNote(note: string) {
    await db.insert(healthChecks).values({ note });
  }

  async function check() {
    const result = await db.select().from(healthChecks).limit(1);
    return result;
  }

  return { db, pool, healthNote, check };
}
