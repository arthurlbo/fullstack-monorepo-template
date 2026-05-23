"use client";

import type { ComponentProps, JSX, ReactNode } from "react";

import { AppProgressProvider } from "@bprogress/next";
import { ThemeProvider } from "next-themes";

interface IProps {
    children: ReactNode;
    themeConfig: ComponentProps<typeof ThemeProvider>;
}

export function Providers({ children, themeConfig }: IProps): JSX.Element {
    return (
        <ThemeProvider {...themeConfig}>
            <AppProgressProvider
                height="2px"
                options={{ showSpinner: false }}
                color="var(--primary-100)"
                shallowRouting
            >
                {children}
            </AppProgressProvider>
        </ThemeProvider>
    );
}
