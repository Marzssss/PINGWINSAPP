/**
 * Universal Card Component
 * Container with dark surface background, hairline borders, and Apple-like elevation.
 */
import React from "react";
import { View, type ViewProps } from "react-native";
import { shadows } from "@src/constants/tokens";

type CardVariant = "default" | "filled" | "elevated" | "outlined" | "glass" | "neon";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends ViewProps {
    variant?: CardVariant;
    padding?: CardPadding;
}

const variantStyles = {
    default: "bg-surface border border-border-subtle",
    filled: "bg-surface-elevated border border-border-subtle",
    elevated: "bg-surface-elevated border border-border-subtle shadow-lg",
    outlined: "bg-transparent border border-border",
    glass: "bg-black/60 border border-white/10", // Requires BlurView for real glass, fallback for now
    neon: "bg-surface border border-neon/40",
};

const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
};

export function Card({
    variant = "default",
    padding = "md",
    className,
    style,
    children,
    ...props
}: CardProps) {
    const variantShadowStyle = variant === "neon" ? shadows.glowNeon : undefined;

    return (
        <View
            className={`
        rounded-2xl
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className || ""}
      `}
            style={[variantShadowStyle, style]}
            {...props}
        >
            {children}
        </View>
    );
}
