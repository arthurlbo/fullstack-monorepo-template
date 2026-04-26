# `@repo/typescript`

Shared TypeScript configuration package for the monorepo.

## Overview

This package provides centralized `tsconfig` base files for all apps and packages in the workspace, ensuring consistent compiler options throughout.

## Available Configs

| File | Use for |
|---|---|
| `base.json` | Generic TypeScript packages (library builds with tsup) |
| `next.json` | Next.js apps |
| `nest.json` | NestJS apps (enables `emitDecoratorMetadata`, `experimentalDecorators`) |

## Usage

In your `tsconfig.json`:

```json
{
    "extends": "@repo/typescript/nest.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "."
    },
    "include": ["src", "test"],
    "exclude": ["node_modules", "dist"]
}
```

## Installation

This package is already part of the workspace. To use it in your app:

```json
{
    "devDependencies": {
        "@repo/typescript": "workspace:*"
    }
}
```
