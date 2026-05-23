import { type JSX, useState } from "react";
import type { ComponentType } from "react";

import { Text, TextInput, type TextInputProps, TouchableOpacity, View } from "react-native";

import { theme } from "../theme";
import { cn } from "../utils";

type TIconComponent = ComponentType<{ size?: number; color?: string }>;

interface IInputProps extends Omit<TextInputProps, "style"> {
    label?: string;
    description?: string;
    error?: string;
    className?: string;
    containerClassName?: string;
    iconLeft?: TIconComponent;
    iconRight?: TIconComponent;
    onPressIconRight?: () => void;
}

export const Input = ({
    label,
    description,
    error,
    className,
    containerClassName,
    iconLeft: IconLeft,
    iconRight: IconRight,
    onPressIconRight,
    secureTextEntry,
    editable = true,
    ...props
}: IInputProps): JSX.Element => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPasswordField = secureTextEntry !== undefined && secureTextEntry;

    const handleTogglePassword = () => setIsPasswordVisible((previous) => !previous);

    const iconColor = error ? theme.colors.error[400] : theme.colors.surface[100];

    return (
        <View className={cn("gap-1", containerClassName)}>
            {label ? <Text className="text-primary-200 text-sm font-semibold">{label}</Text> : null}

            <View
                className={cn(
                    "border-surface-500 bg-surface-700 flex-row items-center gap-2 rounded-xl border px-4 py-3",
                    error && "border-error-400",
                    !editable && "opacity-50",
                )}
            >
                {IconLeft ? <IconLeft size={16} color={iconColor} /> : null}

                <TextInput
                    {...props}
                    editable={editable}
                    secureTextEntry={isPasswordField && !isPasswordVisible}
                    placeholderTextColor={theme.colors.surface[300]}
                    className={cn("font-body text-primary-100 flex-1 text-base", className)}
                />

                {isPasswordField ? (
                    <TouchableOpacity onPress={handleTogglePassword} hitSlop={8}>
                        {isPasswordVisible ? (
                            <Text className="text-surface-100 text-xs">hide</Text>
                        ) : (
                            <Text className="text-surface-100 text-xs">show</Text>
                        )}
                    </TouchableOpacity>
                ) : IconRight ? (
                    <TouchableOpacity onPress={onPressIconRight} disabled={!onPressIconRight} hitSlop={8}>
                        <IconRight size={16} color={iconColor} />
                    </TouchableOpacity>
                ) : null}
            </View>

            {description && !error ? <Text className="text-surface-100 text-xs">{description}</Text> : null}
            {error ? <Text className="text-error-400 text-xs">{error}</Text> : null}
        </View>
    );
};
