import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './apps/api/src/schema.ts',
  out: './apps/api/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'postgres://mecolator:mecolator@localhost:5432/mecolator',
  },
});
