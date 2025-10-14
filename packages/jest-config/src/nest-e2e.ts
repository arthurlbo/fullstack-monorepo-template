import type { Config } from "jest";

import { nestConfig } from "./nest.js";

export const nestE2eConfig = {
    ...nestConfig,
    testRegex: ".*\\.spec\\.ts$",
} as const satisfies Config;
