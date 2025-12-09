/**
 * Universal Card Component
 * Container with dark surface background, hairline borders, and Apple-like elevation.
 */
import React from "react";
import { View, type ViewProps } from "react-native";

type CardVariant = "default" | "elevated" | "outlined" | "glass";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends ViewProps {
    variant?: CardVariant;
    padding?: CardPadding;
}

const variantStyles = {
    default: "bg-surface border border-border-subtle",
    elevated: "bg-surface-elevated border-t border-white/5 shadow-lg",
    outlined: "bg-transparent border border-border",
    glass: "bg-black/80 border border-white/10", // Requires BlurView for real glass, fallback for now
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
    children,
    ...props
}: CardProps) {
    return (
        <View
            className={`
        rounded-2xl
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className || ""}
      `}
            {...props}
        >
            {children}
        </View>
    );
}
