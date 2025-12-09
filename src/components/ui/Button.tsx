/**
 * Universal Button Component (Premium)
 * Features:
 * - Fluid scale animation on press (Reanimated)
 * - Haptic feedback (Expo Haptics)
 * - Native iOS spinner
 * - Cash App/Apple visual style
 */
import React from "react";
import {
    Text,
    ActivityIndicator,
    type PressableProps,
    Pressable,
    View,
} from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { isNative } from "@src/utils/platform";
import { Ionicons } from "@expo/vector-icons";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
}

const variantStyles = {
    primary: {
        container: "bg-primary border-transparent shadow-sm",
        text: "text-background font-semibold",
        indicator: "#000000",
    },
    secondary: {
        container: "bg-surface-elevated border-border-subtle",
        text: "text-foreground font-semibold",
        indicator: "#FFFFFF",
    },
    outline: {
        container: "bg-transparent border-border",
        text: "text-foreground font-medium",
        indicator: "#FFFFFF",
    },
    ghost: {
        container: "bg-transparent border-transparent",
        text: "text-primary font-medium",
        indicator: "#00D632",
    },
};

const sizeStyles = {
    sm: {
        container: "px-4 h-[36px]",
        text: "text-sm",
        gap: 6,
    },
    md: {
        container: "px-6 h-[50px]", // Apple standard tap area
        text: "text-base",
        gap: 8,
    },
    lg: {
        container: "px-8 h-[58px]",
        text: "text-lg",
        gap: 10,
    },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    disabled,
    onPress,
    icon,
    ...props
}: ButtonProps) {
    const scale = useSharedValue(1);

    const isDisabled = disabled || loading;
    const styles = variantStyles[variant];
    const sizes = sizeStyles[size];

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        if (isDisabled) return;
        scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
        if (isNative) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const handlePressOut = () => {
        if (isDisabled) return;
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isDisabled}
            className={`
                flex-row items-center justify-center
                rounded-2xl border
                ${styles.container}
                ${sizes.container}
                ${fullWidth ? "w-full" : "self-start"}
                ${isDisabled ? "opacity-60" : ""}
            `}
            style={[animatedStyle, { gap: sizes.gap }]}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={styles.indicator}
                    size="small"
                />
            ) : (
                <>
                    {icon && (
                        <Ionicons
                            name={icon}
                            size={size === 'sm' ? 16 : 20}
                            color={variant === 'primary' ? '#000000' : '#FFFFFF'}
                        />
                    )}
                    <Text className={`${styles.text} ${sizes.text} text-center`}>
                        {children}
                    </Text>
                </>
            )}
        </AnimatedPressable>
    );
}
