import path from "node:path";

import * as dotenv from "dotenv";
import { findUpSync } from "find-up";
import { treeifyError } from "zod";

import { type Env, envSchema } from "./env.schema";

const getEnvFilePath = (): string => {
    const environment = process.env.NODE_ENV || "development";

    const workspaceRoot = findUpSync("pnpm-workspace.yaml", {
        cwd: __dirname,
        type: "file",
    });

    const rootDir = workspaceRoot ? path.dirname(workspaceRoot) : path.resolve(__dirname, "../..");

    return path.join(rootDir, `.env.${environment}`);
};

const loadEnv = (): Env => {
    const envPath = getEnvFilePath();

    dotenv.config({ path: envPath });

    const validationResult = envSchema.safeParse(process.env);

    if (validationResult.success === false) {
        console.error(
            "❌ Invalid environment variables:",
            JSON.stringify(treeifyError(validationResult.error), null, 2),
        );

        throw new Error("Invalid environment variables");
    }

    return validationResult.data;
};

const env = loadEnv();

export { env, type Env };
