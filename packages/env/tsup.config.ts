import { baseConfig } from "@repo/tsup";
import { type Options, defineConfig } from "tsup";

const config: Options = {
    ...baseConfig,
    bundle: true,
    entry: ["src/index.ts"],
};

export default defineConfig(config);
