# `@repo/tsup`

Shared tsup configuration package for the monorepo.

## Overview

This package provides a centralized tsup base configuration for building TypeScript packages, ensuring consistent build output (ESM + CJS + type declarations) across all packages in the workspace.

## Usage

In your `tsup.config.ts`:

```ts
import { baseConfig } from "@repo/tsup";
import { defineConfig } from "tsup";

export default defineConfig({
    ...baseConfig,
    entry: ["src/index.ts"],
});
```

## Installation

This package is already part of the workspace. To use it in your app:

```json
{
    "devDependencies": {
        "@repo/tsup": "workspace:*"
    }
}
```
