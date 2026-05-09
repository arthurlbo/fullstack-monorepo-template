import path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export const createNextConfig = (rootDir: string) =>
    defineConfig({
        plugins: [react(), tsconfigPaths()],
        resolve: {
            alias: { "@": path.join(rootDir, "src") },
        },
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: ["./vitest.setup.ts"],
            include: ["**/*.test.{ts,tsx}"],
            coverage: {
                provider: "v8",
                reportsDirectory: "coverage",
                include: ["src/**/*.{ts,tsx}"],
                exclude: [
                    "src/**/*.d.ts",
                    "src/**/*.test.{ts,tsx}",
                    "src/**/*.spec.{ts,tsx}",
                    "src/**/*.stories.{ts,tsx}",
                ],
            },
        },
    });
