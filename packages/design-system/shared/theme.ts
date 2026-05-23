export const theme = {
    colors: {
        background: "#0F131F",
        foreground: "#FBFCFD",
        primary: {
            100: "#FBFCFD",
            200: "#E2E4E9",
            300: "#C4C7D0",
            400: "#9DA0AB",
            500: "#777A85",
            600: "#52555F",
            700: "#3A3C45",
        },
        accent: {
            100: "#EBEDFC",
            200: "#C8C9F5",
            300: "#A4A6EF",
            400: "#7A7BE8",
            500: "#4F4DD9",
            600: "#3E3CB8",
            700: "#2D2B8A",
        },
        surface: {
            100: "#7C84A1",
            200: "#6D7590",
            300: "#5C637D",
            400: "#4C536B",
            500: "#3E445B",
            600: "#31374C",
            700: "#24293B",
        },
        success: {
            500: "#22C55E",
        },
        error: {
            400: "#F87171",
        },
    },
    fontFamily: {
        body: ["PlusJakartaSans_400Regular"],
        medium: ["PlusJakartaSans_500Medium"],
        semibold: ["PlusJakartaSans_600SemiBold"],
        heading: ["PlusJakartaSans_700Bold"],
    },
} as const;
