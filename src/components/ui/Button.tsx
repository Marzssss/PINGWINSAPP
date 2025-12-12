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
    type GestureResponderEvent,
    Pressable,
} from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { isNative } from "@src/utils/platform";
import { Ionicons } from "@expo/vector-icons";
import { colors as themeColors, shadows } from "@src/constants/tokens";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "neon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
    className?: string;
}

const variantStyles = {
    primary: {
        container: "bg-primary border-primary/30",
        text: "text-background font-semibold",
        indicator: themeColors.primary.text,
    },
    secondary: {
        container: "bg-surface-elevated border-border-subtle",
        text: "text-foreground font-semibold",
        indicator: themeColors.foreground.DEFAULT,
    },
    outline: {
        container: "bg-transparent border-border",
        text: "text-foreground font-medium",
        indicator: themeColors.foreground.DEFAULT,
    },
    ghost: {
        container: "bg-transparent border-transparent",
        text: "text-neon font-medium",
        indicator: themeColors.info,
    },
    neon: {
        container: "bg-neon-muted border-neon/60",
        text: "text-neon font-semibold",
        indicator: themeColors.info,
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
    onPressIn,
    onPressOut,
    icon,
    className,
    ...props
}: ButtonProps) {
    const scale = useSharedValue(1);

    const isDisabled = disabled || loading;
    const styles = variantStyles[variant];
    const sizes = sizeStyles[size];

    const variantShadowStyle =
        variant === "primary"
            ? shadows.glowGold
            : variant === "neon"
                ? shadows.glowNeon
                : undefined;

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = (event: GestureResponderEvent) => {
        if (isDisabled) return;
        scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
        if (isNative) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPressIn?.(event);
    };

    const handlePressOut = (event: GestureResponderEvent) => {
        if (isDisabled) return;
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
        onPressOut?.(event);
    };

    const iconColor =
        variant === "primary"
            ? themeColors.primary.text
            : variant === "neon" || variant === "ghost"
                ? themeColors.info
                : themeColors.foreground.DEFAULT;

    return (
        <AnimatedPressable
            {...props}
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
                ${className || ""}
            `}
            style={[animatedStyle, variantShadowStyle, { gap: sizes.gap }]}
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
                            color={iconColor}
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
