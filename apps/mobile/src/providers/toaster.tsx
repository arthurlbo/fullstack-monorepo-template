import Toast, { BaseToast, type BaseToastProps } from "react-native-toast-message";
import { theme } from "@/shared/utils";

const toastConfig = {
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: "#22C55E", backgroundColor: theme.colors.surface[700] }}
            text1Style={{ color: theme.colors.primary[100] }}
            text2Style={{ color: theme.colors.primary[300] }}
        />
    ),
    error: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: "#F87171", backgroundColor: theme.colors.surface[700] }}
            text1Style={{ color: theme.colors.primary[100] }}
            text2Style={{ color: theme.colors.primary[300] }}
        />
    ),
};

export const Toaster = () => {
    return <Toast config={toastConfig} />;
};
