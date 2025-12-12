/**
 * Universal Screen Wrapper
 * Handles safe areas, keyboard avoiding, and specific layout types.
 * Ensures consistent horizontal spacing across the app.
 */
import React from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { spacing, colors } from "@src/constants/tokens";

interface ScreenProps {
    children: React.ReactNode;
    scroll?: boolean;
    safeArea?: boolean; // Default true
    keyboardOffset?: number;
    className?: string;
    style?: ViewStyle;
}

export function Screen({
    children,
    scroll = false,
    safeArea = true,
    keyboardOffset = 0,
    className,
    style,
}: ScreenProps) {
    const insets = useSafeAreaInsets();

    // Base container style
    const containerStyle = {
        flex: 1,
        paddingTop: safeArea ? insets.top : 0,
        paddingBottom: safeArea ? insets.bottom : 0,
        paddingHorizontal: spacing["safe-horizontal"],
    };

    const content = (
        <View
            className={`flex-1 ${className || ""}`}
            style={[{ flex: 1 }, style]} // Helper strict flex-1
        >
            {children}
        </View>
    );

    return (
        <LinearGradient
            colors={[colors.background, colors.surface.DEFAULT, colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            {/* Subtle neon + gold ambience (kept very low opacity) */}
            <View pointerEvents="none" style={[StyleSheet.absoluteFillObject]}>
                <View
                    style={{
                        position: "absolute",
                        top: -180,
                        left: -140,
                        width: 380,
                        height: 380,
                        borderRadius: 190,
                        backgroundColor: colors.info,
                        opacity: 0.12,
                    }}
                />
                <View
                    style={{
                        position: "absolute",
                        bottom: -220,
                        right: -170,
                        width: 440,
                        height: 440,
                        borderRadius: 220,
                        backgroundColor: colors.primary.DEFAULT,
                        opacity: 0.08,
                    }}
                />
            </View>

            <View style={containerStyle}>
                <StatusBar style="light" animated />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={keyboardOffset}
                    style={{ flex: 1 }}
                >
                    {scroll ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            {content}
                        </ScrollView>
                    ) : (
                        content
                    )}
                </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    );
}
