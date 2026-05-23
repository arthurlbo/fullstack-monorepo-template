import type { JSX } from "react";

import Toast, { BaseToast, type BaseToastProps } from "react-native-toast-message";

import { theme } from "@/shared/utils";

const toastConfig = {
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: theme.colors.success[500], backgroundColor: theme.colors.surface[700] }}
            text1Style={{ color: theme.colors.primary[100] }}
            text2Style={{ color: theme.colors.primary[300] }}
        />
    ),
    error: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: theme.colors.error[400], backgroundColor: theme.colors.surface[700] }}
            text1Style={{ color: theme.colors.primary[100] }}
            text2Style={{ color: theme.colors.primary[300] }}
        />
    ),
};

export const Toaster = (): JSX.Element => {
    return <Toast config={toastConfig} />;
};
