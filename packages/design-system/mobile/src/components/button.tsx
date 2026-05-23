import type { ComponentType, ReactNode } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

const buttonVariants = cva(
    "flex-row items-center justify-center gap-2 rounded-xl active:opacity-70",
    {
        variants: {
            variant: {
                default: "bg-surface-600",
                accent: "bg-accent-500",
                outline: "border border-surface-400 bg-transparent",
                ghost: "bg-transparent",
            },
            size: {
                default: "px-4 py-3",
                sm: "px-3 py-2",
                lg: "px-6 py-4",
                icon: "h-10 w-10 items-center justify-center p-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

const buttonTextVariants = cva("font-semibold", {
    variants: {
        variant: {
            default: "text-primary-100",
            accent: "text-white",
            outline: "text-primary-100",
            ghost: "text-primary-100",
        },
        size: {
            default: "text-base",
            sm: "text-sm",
            lg: "text-lg",
            icon: "text-base",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

type TIconProp = {
    icon: ComponentType<{ size?: number; color?: string }>;
    size?: number;
    color?: string;
};

interface IButtonProps extends VariantProps<typeof buttonVariants> {
    children?: ReactNode;
    className?: string;
    textClassName?: string;
    iconLeft?: TIconProp;
    iconRight?: TIconProp;
    onPress?: () => void;
    isDisabled?: boolean;
    isLoading?: boolean;
}

export const Button = ({
    children,
    className,
    textClassName,
    iconLeft,
    iconRight,
    variant,
    size,
    onPress,
    isDisabled,
    isLoading,
}: IButtonProps) => {
    const IconLeft = iconLeft?.icon;
    const IconRight = iconRight?.icon;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled ?? isLoading}
            className={cn(buttonVariants({ variant, size }), isDisabled && "opacity-50", className)}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="#FBFCFD" />
            ) : (
                <>
                    {IconLeft ? <IconLeft size={iconLeft.size ?? 16} color={iconLeft.color ?? "#FBFCFD"} /> : null}
                    {children ? (
                        <Text className={cn(buttonTextVariants({ variant, size }), textClassName)}>{children}</Text>
                    ) : null}
                    {IconRight ? <IconRight size={iconRight.size ?? 16} color={iconRight.color ?? "#FBFCFD"} /> : null}
                </>
            )}
        </Pressable>
    );
};
