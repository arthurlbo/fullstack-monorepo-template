import { z } from "zod";

export const envSchema = z.object({
    // GENERAL CONFIGURATION
    NODE_ENV: z
        .enum(["development", "production", "test"], {
            error: "You forgot to set the NODE_ENV variable",
        })
        .describe("Environment that the app is running in"),
    // WEB CONFIGURATION
    WEB_PORT: z.coerce
        .number({
            error: "You forgot to set the WEB_PORT variable",
        })
        .describe("Port for the web application"),
    // API CONFIGURATION
    API_PORT: z.coerce
        .number({
            error: "You forgot to set the API_PORT variable",
        })
        .describe("Port for the API application"),
    // DB CONFIGURATION
    DB_HOST: z
        .string({
            error: "You forgot to set the DB_HOST variable",
        })
        .default("localhost")
        .describe("Database host address"),
    DB_PORT: z.coerce
        .number({
            error: "You forgot to set the DB_PORT variable",
        })
        .describe("Database port"),
    DB_DATABASE: z
        .string({
            error: "You forgot to set the DB_DATABASE variable",
        })
        .describe("Database name"),
    DB_USERNAME: z
        .string({
            error: "You forgot to set the DB_USERNAME variable",
        })
        .describe("Database user"),
    DB_PASSWORD: z
        .string({
            error: "You forgot to set the DB_PASSWORD variable",
        })
        .describe("Database password"),
});

export type Env = z.infer<typeof envSchema>;
