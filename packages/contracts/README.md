# `@repo/contracts`

Shared validation schemas and TypeScript types for the monorepo.

## Overview

This package is the single source of truth for data shapes shared between the API and the web app. It uses **Zod 4** to define schemas that serve three purposes simultaneously: runtime validation, TypeScript type inference, and Swagger/OpenAPI documentation generation.

## Available Exports

| Export path | Contents |
|---|---|
| `@repo/contracts` | All schemas and types (re-exports everything) |
| `@repo/contracts/users` | User schemas and types |

## Naming Conventions

| Kind | Convention | Example |
|---|---|---|
| Zod schema (variable) | `PascalCase` | `CreateUserSchema`, `UserSchema` |
| Input type (type alias) | `T` prefix | `TCreateUserInput`, `TUserOutput` |

## Usage

### In the API (NestJS)

Domain DTOs are derived from the contract types — no duplication:

```ts
// domain/dtos/create-user.dto.ts
import type { TCreateUserInput } from "@repo/contracts/users";

export interface ICreateUserDTO extends TCreateUserInput {}
```

Validation and Swagger documentation from the same schema:

```ts
import { CreateUserSchema, UserSchema } from "@repo/contracts/users";

@ApiBody({ schema: zodToSwagger(CreateUserSchema) })
@ApiCreatedResponse({ schema: zodToSwagger(UserSchema) })
async create(@Body(new ZodValidationPipe(CreateUserSchema)) data: ICreateUserDTO) {}
```

### In the web (Next.js)

Form validation with React Hook Form or any other library:

```ts
import { CreateUserSchema, type TCreateUserInput } from "@repo/contracts/users";

// With React Hook Form + zodResolver
const form = useForm<TCreateUserInput>({
    resolver: zodResolver(CreateUserSchema),
});

// Or standalone validation
const result = CreateUserSchema.safeParse(formData);
```

## Adding a new schema

1. Create `src/modules/[module]/[module].schema.ts`
2. Export from `src/modules/[module]/index.ts`
3. Re-export from `src/index.ts`
4. Add the new entry point in `tsup.config.ts` and `package.json` exports

## Installation

This package is already part of the workspace. To use it in your app:

```json
{
    "dependencies": {
        "@repo/contracts": "workspace:*",
        "zod": "^4.0.0"
    }
}
```

## Build

```bash
pnpm --filter @repo/contracts build
```
