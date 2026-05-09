import path from "node:path";
import swc from "unplugin-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export const createNestConfig = (rootDir: string) =>
    defineConfig({
        plugins: [tsconfigPaths(), swc.vite({ module: { type: "es6" } })],
        resolve: {
            alias: { "@": path.join(rootDir, "src") },
        },
        test: {
            globals: true,
            environment: "node",
            setupFiles: ["./vitest.setup.ts"],
            include: ["**/*.test.ts"],
            coverage: {
                provider: "v8",
                reportsDirectory: "coverage",
                include: ["src/**/*.ts"],
                exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
            },
        },
    });
