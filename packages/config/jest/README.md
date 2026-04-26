# `@repo/jest`

Shared Jest configuration package for the monorepo.

## Overview

This package provides centralized Jest presets for unit testing across all apps, ensuring consistent settings throughout the workspace.

## Available Presets

| Preset | Import path | Use for |
|---|---|---|
| `base` | `@repo/jest/base` | Generic TypeScript projects |
| `next` | `@repo/jest/next` | Next.js apps (jsdom environment, Testing Library) |
| `nest` | `@repo/jest/nest` | NestJS unit tests (node environment, ts-jest) |
| `nest-e2e` | `@repo/jest/nest-e2e` | NestJS e2e tests with Supertest |

## Usage

In your `jest.config.ts`:

```ts
import type { Config } from "jest";
import baseConfig from "@repo/jest/nest";

const config: Config = {
    ...baseConfig,
    rootDir: ".",
};

export default config;
```

## Installation

This package is already part of the workspace. To use it in your app:

```json
{
    "devDependencies": {
        "@repo/jest": "workspace:*"
    }
}
```

## Build

```bash
pnpm --filter @repo/jest build
```
