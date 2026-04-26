# `@repo/database-typeorm`

Shared TypeORM DataSource configuration package for the monorepo.

## Overview

This package provides a centralized TypeORM `DataSource` for connecting to PostgreSQL. It reads connection settings from `@repo/env` and registers all entities and migrations using explicit class references (not glob patterns) to ensure compatibility with bundlers.

## Usage

```ts
import { dataSource } from "@repo/database-typeorm";

// Use it in a NestJS module
TypeOrmModule.forRootAsync({
    useFactory: () => dataSource.options,
});
```

To register a new entity, export it from `src/entities/index.ts` and add it to the `entities` array in `src/data-source.ts`. Same pattern for migrations.

## Available Scripts

```bash
pnpm --filter @repo/database-typeorm migrate:up    # Run pending migrations
pnpm --filter @repo/database-typeorm migrate:down  # Revert last migration
pnpm --filter @repo/database-typeorm clear:db      # Drop all database schemas
```

Or from the monorepo root (uses `NODE_ENV=development`):

```bash
pnpm migrate:up:dev
pnpm migrate:down:dev
pnpm clear:db:dev
```

## Installation

This package is already part of the workspace. To use it in your app:

```json
{
    "dependencies": {
        "@repo/database-typeorm": "workspace:*"
    }
}
```

## Build

```bash
pnpm --filter @repo/database-typeorm build
```
