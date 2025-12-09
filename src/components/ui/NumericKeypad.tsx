/**
 * Numeric Keypad Component
 * iOS Phone Dialer style with fluid animations and haptics.
 */
import React from "react";
import { View, Text, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { isNative } from "@src/utils/platform";

interface NumericKeypadProps {
    onKeyPress: (key: string) => void;
    onBackspace: () => void;
    onSubmit?: () => void;
    submitLabel?: string;
    disabled?: boolean;
}

const KEYS = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "backspace"],
];

interface KeyButtonProps {
    value: string;
    onPress: () => void;
    disabled?: boolean;
}

function KeyButton({ value, onPress, disabled }: KeyButtonProps) {
    const scale = useSharedValue(1);
    const bgOpacity = useSharedValue(0);

    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const animatedBgStyle = useAnimatedStyle(() => ({
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity.value})`,
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.92, { damping: 15, stiffness: 400 });
        bgOpacity.value = withSpring(0.15); // Highlight effect
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
        bgOpacity.value = withSpring(0);
    };

    const handlePress = async () => {
        if (disabled) return;
        if (isNative) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress();
    };

    // Empty key (spacer)
    if (!value) {
        return <View className="flex-1 h-[72px]" />;
    }

    const isBackspace = value === "backspace";

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            accessibilityRole="button"
            className="flex-1 h-[72px] items-center justify-center"
        >
            <Animated.View
                style={[animatedContainerStyle]}
                className="w-[72px] h-[72px] rounded-full items-center justify-center"
            >
                {/* Background Highlight Layer */}
                <Animated.View
                    style={[animatedBgStyle]}
                    className="absolute inset-0 rounded-full bg-surface-elevated"
                />

                {/* Content */}
                {isBackspace ? (
                    <Ionicons name="backspace-outline" size={32} color="#FFFFFF" />
                ) : (
                    <Text className="text-foreground text-3xl font-normal">{value}</Text>
                )}
            </Animated.View>
        </Pressable>
    );
}

export function NumericKeypad({
    onKeyPress,
    onBackspace,
    onSubmit,
    submitLabel, // Optional override
    disabled = false,
}: NumericKeypadProps) {
    return (
        <View className="w-full px-8 pb-8 pt-4">
            {KEYS.map((row, rowIndex) => (
                <View key={rowIndex} className="flex-row justify-between mb-6">
                    {row.map((key, keyIndex) => (
                        <KeyButton
                            key={`${rowIndex}-${keyIndex}`}
                            value={key}
                            disabled={disabled}
                            onPress={() => {
                                if (key === "backspace") {
                                    onBackspace();
                                } else if (key) {
                                    onKeyPress(key);
                                }
                            }}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
}
