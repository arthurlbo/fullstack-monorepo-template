import "./globals.css";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Providers } from "@/providers";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Providers>
                <Stack screenOptions={{ headerShown: false }} />
            </Providers>
        </SafeAreaProvider>
    );
}
