/**
 * Universal Section Component
 * Layout wrapper with SafeAreaView and consistent spacing.
 */
import React from "react";
import { View, Text, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SectionProps extends ViewProps {
    title?: string;
    subtitle?: string;
    fullScreen?: boolean;
    centered?: boolean;
    padded?: boolean;
}

export function Section({
    title,
    subtitle,
    fullScreen = false,
    centered = false,
    padded = true,
    children,
    className,
    ...props
}: SectionProps) {
    const Container = fullScreen ? SafeAreaView : View;

    return (
        <Container
            className={`
        ${fullScreen ? "flex-1" : ""}
        ${padded ? "px-6 py-4" : ""}
        ${centered ? "items-center justify-center" : ""}
        bg-background
        ${className || ""}
      `}
            {...props}
        >
            {(title || subtitle) && (
                <View className="mb-4">
                    {title && (
                        <Text className="text-foreground text-2xl font-bold">{title}</Text>
                    )}
                    {subtitle && (
                        <Text className="text-foreground-muted text-base mt-1">
                            {subtitle}
                        </Text>
                    )}
                </View>
            )}
            {children}
        </Container>
    );
}
