import { baseConfig } from "@repo/tsup";
import { defineConfig } from "tsup";

export default defineConfig({
    ...baseConfig,
    entry: {
        index: "src/index.ts",
        users: "src/modules/users/index.ts",
    },
    bundle: true,
    external: ["zod"],
});
