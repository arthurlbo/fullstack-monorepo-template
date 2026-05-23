import { z } from "zod";

export const globalSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "staging", "test"]),
});

export const databaseSchema = z.object({
    DB_HOST: z
        .string({
            error: "You forgot to set the DB_HOST variable",
        })
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

export const apiSchema = z.object({
    API_PORT: z.coerce
        .number({
            error: "You forgot to set the API_PORT variable",
        })
        .describe("Port for the API application"),
    ALLOWED_ORIGINS: z
        .string()
        .default("http://localhost:3000")
        .describe("Comma-separated list of allowed CORS origins"),
});

export const webSchema = z.object({
    WEB_PORT: z.coerce
        .number({
            error: "You forgot to set the WEB_PORT variable",
        })
        .describe("Port for the web application"),
    NEXT_PUBLIC_API_URL: z
        .string({
            error: "You forgot to set the NEXT_PUBLIC_API_URL variable",
        })
        .describe("URL for the API application"),
});

export const mobileSchema = z.object({
    EXPO_PUBLIC_API_URL: z
        .string({
            error: "You forgot to set the EXPO_PUBLIC_API_URL variable",
        })
        .describe("URL for the API application"),
});
