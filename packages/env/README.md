# `@repo/env`

Shared environment variable validation package for the monorepo.

## Overview

This package provides centralized, type-safe environment variable validation across all apps. It uses Zod for runtime validation and automatically loads the correct `.env.*` file based on `NODE_ENV`.

Each env object is **lazily validated on first property access** — only the schemas relevant to the running service are triggered, preventing startup failures from variables that belong to a different service.

## Available Exports

| Export | Schema | Variables |
|---|---|---|
| `globalEnv` | `globalSchema` | `NODE_ENV` |
| `databaseEnv` | `databaseSchema` | `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` |
| `apiEnv` | `apiSchema` | `API_PORT`, `ALLOWED_ORIGINS` |
| `webEnv` | `webSchema` | `WEB_PORT`, `NEXT_PUBLIC_API_URL` |
| `mobileEnv` | `mobileSchema` | `EXPO_PUBLIC_API_URL` |

## Usage

```ts
import { apiEnv, databaseEnv } from "@repo/env";

// Validated on first access (lazy)
console.log(apiEnv.API_PORT);       // number
console.log(databaseEnv.DB_HOST);   // string
```

To extend the schema with new variables, edit `src/env.schema.ts` and add fields to the appropriate Zod object.

## Installation

This package is already part of the workspace. To use it in your app:

```json
{
    "dependencies": {
        "@repo/env": "workspace:*"
    }
}
```

## Build

```bash
pnpm --filter @repo/env build
```
