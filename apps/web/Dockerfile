# Build stage
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

WORKDIR /app

COPY biome.json pnpm-workspace.yaml pnpm-lock.yaml package.json turbo.json tsconfig.json ./
COPY packages ./packages
COPY apps/web ./apps/web

RUN pnpm install --frozen-lockfile

RUN pnpm turbo build --filter="web..."

# Production stage
FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app ./

RUN pnpm prune --prod \
    && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget -qO- http://localhost:3000 || exit 1

CMD ["pnpm", "--filter", "web", "start"]
