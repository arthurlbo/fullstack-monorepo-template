import { type JSX, type ReactNode, useEffect } from "react";

import { Platform } from "react-native";

import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";

import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";

import { theme } from "@/shared/utils";

import { Toaster } from "./toaster";

interface IProvidersProps {
    children: ReactNode;
}

SplashScreen.preventAutoHideAsync();

export const Providers = ({ children }: IProvidersProps): JSX.Element | null => {
    const [fontsLoaded] = useFonts({
        PlusJakartaSans_400Regular,
        PlusJakartaSans_500Medium,
        PlusJakartaSans_600SemiBold,
        PlusJakartaSans_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        if (Platform.OS === "android") {
            NavigationBar.setBackgroundColorAsync(theme.colors.background);
            NavigationBar.setButtonStyleAsync("light");
        }
    }, []);

    if (!fontsLoaded) return null;

    return (
        <>
            {children}
            <Toaster />
        </>
    );
};
