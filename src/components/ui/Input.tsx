/**
 * Universal Input Component (Premium)
 * Features:
 * - Animated focus border/glow
 * - Clean typography
 * - Phone formatting
 */
import React from "react";
import { View, TextInput, Text, type TextInputProps } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
} from "react-native-reanimated";

interface InputProps extends Omit<TextInputProps, "style"> {
    label?: string;
    helperText?: string;
    error?: string;
    phoneFormat?: boolean;
}

function formatPhoneNumber(value: string): string {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function Input({
    label,
    helperText,
    error,
    phoneFormat = false,
    value,
    onChangeText,
    ...props
}: InputProps) {
    const focusProgress = useSharedValue(0); // 0 = blur, 1 = focused
    const hasError = !!error;

    const handleFocus = () => {
        focusProgress.value = withTiming(1, { duration: 200 });
    };

    const handleBlur = () => {
        focusProgress.value = withTiming(0, { duration: 200 });
    };

    const handleChangeText = (text: string) => {
        if (phoneFormat) {
            const digits = text.replace(/\D/g, "").slice(0, 10);
            onChangeText?.(digits);
        } else {
            onChangeText?.(text);
        }
    };

    const displayValue = phoneFormat && value ? formatPhoneNumber(value) : value;

    const borderStyle = useAnimatedStyle(() => {
        // Interpolate border color from border-subtle to primary (or error)
        const borderColor = interpolateColor(
            focusProgress.value,
            [0, 1],
            [hasError ? "#FF453A" : "#38383A", hasError ? "#FF453A" : "#00D632"]
        );

        return {
            borderColor,
            borderWidth: 1, // Keep hairline consistent or thicken slightly on focus? 1px is fine.
        };
    });

    return (
        <View className="w-full mb-4">
            {label && (
                <Text className="text-foreground-muted text-sm mb-2 font-medium ml-1">
                    {label}
                </Text>
            )}

            <Animated.View
                style={[
                    borderStyle,
                    { borderRadius: 12, backgroundColor: "#2C2C2E" }, // surface-elevated
                ]}
                className="w-full h-[56px] justify-center"
            >
                <TextInput
                    value={displayValue}
                    onChangeText={handleChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderTextColor="#6B6B6B"
                    keyboardType={phoneFormat ? "phone-pad" : props.keyboardType}
                    accessibilityLabel={label}
                    className="flex-1 px-4 text-foreground text-lg"
                    style={{ outlineStyle: 'none' }} // Web fix
                    selectionColor="#00D632"
                    {...props}
                />
            </Animated.View>

            {(helperText || error) && (
                <Text
                    className={`
            text-sm mt-2 ml-1
            ${hasError ? "text-error" : "text-foreground-muted"}
          `}
                >
                    {error || helperText}
                </Text>
            )}
        </View>
    );
}
