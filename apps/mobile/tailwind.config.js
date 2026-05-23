/** @type {import('tailwindcss').Config} */
const { theme } = require("@repo/design-system-mobile/theme");

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "../../packages/design-system/mobile/src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            ...theme,
        },
    },
    plugins: [],
    presets: [require("nativewind/preset")],
};
