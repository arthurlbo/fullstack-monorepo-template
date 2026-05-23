import path from "node:path";

import * as dotenv from "dotenv";
import { findUpSync } from "find-up";
import z from "zod";

import { apiSchema, databaseSchema, globalSchema, webSchema, mobileSchema } from "./env.schema";

const getEnvFilePath = (): string => {
    const environment = process.env.NODE_ENV || "development";

    const workspaceRoot = findUpSync("pnpm-workspace.yaml", {
        cwd: process.cwd(),
        type: "file",
    });

    const rootDir = workspaceRoot ? path.dirname(workspaceRoot) : path.resolve(import.meta.dirname, "../..");

    return path.join(rootDir, `.env.${environment}`);
};

const envPath = getEnvFilePath();
dotenv.config({ path: envPath });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateEnv = <T extends z.ZodType<any>>(schema: T, schemaName: string): z.infer<T> => {
    const validationResult = schema.safeParse(process.env);

    if (!validationResult.success) {
        console.error(
            `❌ Invalid environment variables for [${schemaName}]:`,
            JSON.stringify(z.treeifyError(validationResult.error), null, 2),
        );
        throw new Error(`Invalid environment variables for ${schemaName}`);
    }

    return validationResult.data;
};

// Each env object is lazily validated on first property access.
// This prevents a service from failing at startup due to missing
// variables that belong to a different service.
const createLazy = <T extends object>(factory: () => T): T => {
    let cache: T | undefined;
    return new Proxy({} as T, {
        get(_, key) {
            if (!cache) cache = factory();
            return cache[key as keyof T];
        },
        has(_, key) {
            if (!cache) cache = factory();
            return key in cache;
        },
    });
};

export const globalEnv = createLazy(() => validateEnv(globalSchema, "global"));
export const databaseEnv = createLazy(() => validateEnv(databaseSchema, "database"));
export const apiEnv = createLazy(() => validateEnv(apiSchema, "api"));
export const webEnv = createLazy(() => validateEnv(webSchema, "web"));
export const mobileEnv = createLazy(() => validateEnv(mobileSchema, "mobile"));
