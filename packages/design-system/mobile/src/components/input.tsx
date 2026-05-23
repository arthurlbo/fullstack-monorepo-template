import { useState } from "react";
import type { ComponentType } from "react";
import { Text, TextInput, type TextInputProps, TouchableOpacity, View } from "react-native";

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
}: IInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPasswordField = secureTextEntry !== undefined && secureTextEntry;

    const handleTogglePassword = () => setIsPasswordVisible((previous) => !previous);

    const iconColor = error ? "#F87171" : "#7C84A1";

    return (
        <View className={cn("gap-1", containerClassName)}>
            {label ? <Text className="font-semibold text-sm text-primary-200">{label}</Text> : null}

            <View
                className={cn(
                    "flex-row items-center gap-2 rounded-xl border border-surface-500 bg-surface-700 px-4 py-3",
                    error && "border-error-400",
                    !editable && "opacity-50",
                )}
            >
                {IconLeft ? <IconLeft size={16} color={iconColor} /> : null}

                <TextInput
                    {...props}
                    editable={editable}
                    secureTextEntry={isPasswordField && !isPasswordVisible}
                    placeholderTextColor="#5C637D"
                    className={cn("flex-1 font-body text-base text-primary-100", className)}
                />

                {isPasswordField ? (
                    <TouchableOpacity onPress={handleTogglePassword} hitSlop={8}>
                        {isPasswordVisible ? (
                            <Text className="text-xs text-surface-100">hide</Text>
                        ) : (
                            <Text className="text-xs text-surface-100">show</Text>
                        )}
                    </TouchableOpacity>
                ) : IconRight ? (
                    <TouchableOpacity onPress={onPressIconRight} disabled={!onPressIconRight} hitSlop={8}>
                        <IconRight size={16} color={iconColor} />
                    </TouchableOpacity>
                ) : null}
            </View>

            {description && !error ? <Text className="text-xs text-surface-100">{description}</Text> : null}
            {error ? <Text className="text-xs text-error-400">{error}</Text> : null}
        </View>
    );
};
