import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

/** @type {import('jest').Config} */
const customConfig = {
    displayName: "web",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
    coverageDirectory: "coverage",
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts", "!src/**/*.stories.{js,jsx,ts,tsx}"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

export default createJestConfig(customConfig);
