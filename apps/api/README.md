# API

NestJS 11 API in the monorepo, following a DDD architecture.

## What is inside?

- NestJS 11 + TypeScript
- DDD architecture (domain, application, infrastructure, presentation layers)
- TypeORM + PostgreSQL (DataSource and migrations co-located in the API)
- Zod validation via `@repo/contracts` (shared schemas between API and web)
- Helmet (security headers) + Compression
- Swagger (API documentation, generated from Zod schemas)
- Vitest (unit tests, with SWC for decorator metadata)
- Vitest + Supertest (end-to-end tests)
- Dockerfile for containerized deployments

## Getting Started

Install dependencies at the monorepo root and run the dev server:

```bash
pnpm install
pnpm --filter api dev
```

The server runs by default on the port defined by `API_PORT` in your `.env.*` file (typically `3001`).

## Endpoints

| Path            | Description                                     |
| --------------- | ----------------------------------------------- |
| `GET /health`   | Health check (excluded from global prefix)      |
| `GET /api/docs` | Swagger documentation UI                        |
| `* /api/v1/*`   | All API routes (global prefix + URI versioning) |

## Available Commands

```bash
pnpm --filter api dev                  # Start in watch mode
pnpm --filter api dev:debug            # Start in debug + watch mode
pnpm --filter api build                # Build for production
pnpm --filter api start                # Start built app
pnpm --filter api typecheck            # Type-check TypeScript files
pnpm --filter api lint                 # Check lint and formatting
pnpm --filter api lint:fix             # Fix lint and formatting
pnpm --filter api test:unit            # Run unit tests
pnpm --filter api test:unit:coverage   # Run unit tests with coverage
pnpm --filter api test:e2e             # Run end-to-end tests
pnpm --filter api test:all             # Run all tests
```

### Database

Run from the monorepo root (sets `NODE_ENV` automatically):

```bash
pnpm migrate:generate:dev       # Generate a new migration file (development)
pnpm migrate:up:dev             # Run pending migrations (development)
pnpm migrate:up:staging         # Run pending migrations (staging)
pnpm migrate:up:production      # Run pending migrations (production)
pnpm migrate:down:dev           # Revert last migration (development)
pnpm migrate:down:staging       # Revert last migration (staging)
pnpm clear:db:dev               # Drop all tables (development)
```

In CI/CD, `NODE_ENV` is injected by the environment — run the base scripts directly:

```bash
pnpm --filter=api migrate:up
pnpm --filter=api migrate:down
```

## Structure

```text
apps/api/
├── src/
│   ├── main.ts                        # Bootstrap (Swagger, CORS, shutdown hooks)
│   ├── app.module.ts                  # Root module
│   ├── app.setup.ts                   # App configuration (versioning, global prefix)
│   ├── health/                        # Health check module (@nestjs/terminus)
│   ├── infra/
│   │   ├── database/
│   │   │   ├── data-source.ts         # TypeORM DataSource + dataSourceOptions
│   │   │   ├── database.module.ts     # NestJS TypeORM module setup
│   │   │   └── migrations/            # TypeORM migration files
│   │   ├── cache/                     # Cache infrastructure (e.g. Redis)
│   │   └── storage/                   # Storage infrastructure (e.g. S3)
│   ├── modules/
│   │   └── [module]/                  # One directory per domain module
│   │       ├── domain/
│   │       │   ├── dtos/              # Input/output DTOs (derived from @repo/contracts)
│   │       │   ├── entities/          # Domain entities (pure TypeScript, no ORM)
│   │       │   └── repositories/      # Repository interfaces (ports)
│   │       ├── application/
│   │       │   └── use-cases/         # One directory per use case + its unit test
│   │       ├── infra/
│   │       │   └── typeorm/           # ORM entities, mappers, repository implementations
│   │       ├── presentation/
│   │       │   └── http/              # Controllers and response DTOs
│   │       └── [module].module.ts
│   └── shared/                        # pipes, utils, decorators, etc, used across multiple modules.
│       ├── commons/
│       ├── constants/
│       ├── decorators/
│       ├── exceptions/
│       ├── filters/
│       ├── guards/
│       ├── interceptors/
│       ├── pipes/
│       └── utils/
├── test/
│   └── e2e/                           # E2E tests (Supertest)
├── vitest.config.ts
├── vitest.setup.ts
├── vitest-e2e.config.ts
└── Dockerfile
```

## DDD Architecture

Each module follows a strict layered structure with a one-way dependency rule:

```
presentation → application → domain ← infrastructure
```

| Layer              | Responsibility                                                        |
| ------------------ | --------------------------------------------------------------------- |
| **domain**         | Entities, repository interfaces, DTOs — pure TypeScript, no framework |
| **application**    | Use cases — orchestrate domain logic, depend only on domain           |
| **infrastructure** | TypeORM entities, mappers, repository implementations                 |
| **presentation**   | HTTP controllers, response DTOs, Swagger decorators                   |

## Validation with Zod

Request validation uses `ZodValidationPipe` from `src/shared/pipes/` in combination with schemas from `@repo/contracts`. Swagger documentation is generated automatically from the same schemas via `zodToSwagger`.

```ts
// Controller example
@Post()
@ApiBody({ schema: zodToSwagger(CreateUserSchema) })
@ApiCreatedResponse({ schema: zodToSwagger(UserSchema) })
async create(@Body(new ZodValidationPipe(CreateUserSchema)) data: ICreateUserDTO) {}
```

Domain DTOs are derived from the contract schemas — no duplication:

```ts
// domain/dtos/create-user.dto.ts
import type { TCreateUserInput } from "@repo/contracts/users";

export interface ICreateUserDTO extends TCreateUserInput {}
```
