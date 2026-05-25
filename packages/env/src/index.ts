import path from "node:path";

import * as dotenv from "dotenv";
import { findUpSync } from "find-up";
import z from "zod";

import { apiSchema, databaseSchema, globalSchema, mobileSchema, webSchema } from "./env.schema";

const loadEnvFile = (): void => {
    const environment = process.env.NODE_ENV || "development";

    const workspaceRoot = findUpSync("pnpm-workspace.yaml", {
        cwd: process.cwd(),
        type: "file",
    });

    if (!workspaceRoot) return;

    const envFilePath = path.join(path.dirname(workspaceRoot), `.env.${environment}`);
    dotenv.config({ path: envFilePath });
};

loadEnvFile();

const validateEnv = <T extends z.ZodTypeAny>(schema: T, schemaName: string): z.infer<T> => {
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
