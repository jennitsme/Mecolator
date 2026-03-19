# Mecolator

Fresh project scaffold for building scalable, secure, agentic/web3 services.

## Stack (initial)
- Node 22, pnpm workspaces
- Fastify API (apps/api)
- TypeScript strict, ESLint + Prettier
- CI: GitHub Actions (lint/test/build)
- Dockerfile + docker-compose (api + Postgres)

## Structure
- `apps/api` — Fastify service with health/echo endpoints
- `packages/ai` — placeholder for LLM/agent wrappers
- `packages/web3` — placeholder for ethers/viem utilities
- `packages/config` — shared config/env schemas
- `docs/adr` — architecture decision records

## Getting Started
```bash
corepack enable pnpm
pnpm install
pnpm dev # runs apps/api
curl http://localhost:3000/health
```

### Database (Drizzle + Postgres)
Schema location: `apps/api/src/schema.ts`
Config: `apps/api/drizzle.config.mjs`

Generate migrations:
```bash
cd apps/api
pnpm db:generate
```
Apply to DB:
```bash
cd apps/api
pnpm db:push
```

## Next Steps
- Implement proper config loader + secrets handling
- Expand DB schema (domain tables) and observability (OpenTelemetry)
- Add auth (JWT/session) and logging pipeline (pino transport)
- Flesh out AI + web3 packages with concrete clients
```
