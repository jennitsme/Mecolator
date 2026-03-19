import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const healthChecks = pgTable('health_checks', {
  id: serial('id').primaryKey(),
  note: text('note'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
