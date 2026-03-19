import dotenv from 'dotenv';
import { z } from 'zod';
import { baseEnvSchema } from './index.js';

dotenv.config();

const appEnvSchema = baseEnvSchema.extend({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z
    .string()
    .url()
    .default('postgres://mecolator:mecolator@localhost:5432/mecolator'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
});

export type AppEnv = z.infer<typeof appEnvSchema>;

export function loadConfig(): AppEnv {
  const parsed = appEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid env: ${parsed.error.message}`);
  }
  return parsed.data;
}
