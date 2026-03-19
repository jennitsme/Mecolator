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

## Next Steps
- Implement proper config loader + secrets handling
- Add DB layer (Drizzle + Postgres) and migrations
- Add auth (JWT/session) and observability (OpenTelemetry)
- Flesh out AI + web3 packages with concrete clients
```
