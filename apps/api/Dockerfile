# Build stage
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

WORKDIR /app

COPY biome.json pnpm-workspace.yaml pnpm-lock.yaml package.json turbo.json tsconfig.json ./
COPY packages ./packages
COPY apps/api ./apps/api

RUN pnpm install --frozen-lockfile

RUN pnpm turbo build --filter="api..."

# Production stage
FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nestjs

COPY --from=builder /app ./

RUN pnpm prune --prod \
    && chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget -qO- http://localhost:3001/health || exit 1

CMD ["node", "apps/api/dist/main.js"]
