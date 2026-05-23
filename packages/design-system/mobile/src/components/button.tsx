import type { ComponentType, ReactNode } from "react";

import { ActivityIndicator, Pressable, Text } from "react-native";

import { type VariantProps, cva } from "class-variance-authority";

import { theme } from "../theme";
import { cn } from "../utils";

const buttonVariants = cva("flex-row items-center justify-center gap-2 rounded-xl active:opacity-70", {
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
});

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

type TVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
type TSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const iconColorByVariant: Record<TVariant, string> = {
    default: theme.colors.primary[100],
    accent: theme.colors.foreground,
    outline: theme.colors.primary[100],
    ghost: theme.colors.primary[100],
};

const iconSizeBySize: Record<TSize, number> = {
    default: 16,
    sm: 14,
    lg: 20,
    icon: 20,
};

export type TIcon = {
    icon: ComponentType<{ size?: number; color?: string }>;
    size?: number;
    color?: string;
};

interface IButtonProps extends VariantProps<typeof buttonVariants> {
    children?: ReactNode;
    className?: string;
    textClassName?: string;
    iconLeft?: TIcon;
    iconRight?: TIcon;
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

    const iconColor = iconColorByVariant[variant ?? "default"];
    const iconSize = iconSizeBySize[size ?? "default"];

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled ?? isLoading}
            className={cn(buttonVariants({ variant, size }), isDisabled && "opacity-50", className)}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color={iconColor} />
            ) : (
                <>
                    {IconLeft ? (
                        <IconLeft size={iconLeft.size ?? iconSize} color={iconLeft.color ?? iconColor} />
                    ) : null}

                    {children ? (
                        <Text className={cn(buttonTextVariants({ variant, size }), textClassName)}>{children}</Text>
                    ) : null}

                    {IconRight ? (
                        <IconRight size={iconRight.size ?? iconSize} color={iconRight.color ?? iconColor} />
                    ) : null}
                </>
            )}
        </Pressable>
    );
};
