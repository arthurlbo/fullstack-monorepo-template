import { defineConfig } from "tsup";

import { baseConfig } from "@repo/tsup";

export default defineConfig({
    ...baseConfig,
    entry: ["src/theme.ts"],
    external: ["react", "react-native"],
});
