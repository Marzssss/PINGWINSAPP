/**
 * Welcome Screen
 * First onboarding screen with hero text and Get Started button.
 */
import React from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { Button } from "@src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { colors, shadows } from "@src/constants/tokens";

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <Screen className="justify-center">
            <View className="flex-1 justify-center px-4">
                {/* Hero Section */}
                <View className="items-center mb-12">
                    {/* Logo Mark */}
                    <View
                        className="w-32 h-32 mb-8 rounded-[28px]"
                        style={{
                            ...shadows.glowGold,
                            shadowOpacity: 0.5,
                            shadowRadius: 20,
                        }}
                    >
                        <View className="w-full h-full bg-surface-overlay rounded-[28px] items-center justify-center border-2 border-primary/50 overflow-hidden">
                            <Image
                                source={require("../../assets/images/93A6CA43-00EC-4D59-9993-74E63D42C2A4 (1).png")}
                                style={{ width: "100%", height: "100%" }}
                                resizeMode="cover"
                                accessibilityLabel="PINGWINS logo"
                            />
                        </View>
                    </View>

                    {/* Hero Text */}
                    <Text className="text-foreground text-3xl font-bold text-center mb-3 tracking-tight">
                        Welcome to PINGWINS
                    </Text>
                    <Text className="text-foreground-muted text-lg text-center leading-relaxed max-w-xs font-medium">
                        Secure your devices with next-generation identity verification.
                    </Text>
                </View>

                {/* Features List */}
                <View className="mb-12">
                    <FeatureItem
                        icon="lock-closed-outline"
                        title="Device-Locked Security"
                        description="Your identity is bound to your device"
                    />
                    <FeatureItem
                        icon="flash-outline"
                        title="Instant Verification"
                        description="Authenticate in seconds with NFC"
                    />
                    <FeatureItem
                        icon="card-outline"
                        title="WINSPAY Ready"
                        description="Seamless payments, zero friction"
                    />
                </View>
            </View>

            {/* Bottom CTA */}
            <View className="pb-6">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={() => router.push("/(onboarding)/create-account")}
                >
                    Get Started
                </Button>

                <Text className="text-foreground-subtle text-xs text-center mt-6">
                    By continuing, you agree to our Terms of Service
                </Text>
            </View>
        </Screen>
    );
}

function FeatureItem({
    icon,
    title,
    description,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
}) {
    return (
        <View className="flex-row items-center mb-6">
            <View className="w-12 h-12 bg-surface-elevated rounded-xl items-center justify-center mr-4 border border-border-subtle">
                <Ionicons name={icon} size={24} color={colors.primary.DEFAULT} />
            </View>
            <View className="flex-1">
                <Text className="text-foreground text-base font-semibold mb-1">{title}</Text>
                <Text className="text-foreground-muted text-sm leading-5">{description}</Text>
            </View>
        </View>
    );
}
