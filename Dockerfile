FROM node:22-alpine
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile || pnpm install
COPY . .
RUN pnpm --filter api build || true
EXPOSE 3000
CMD ["pnpm", "dev"]
