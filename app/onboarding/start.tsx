/**
 * Stripe Connect Onboarding Start Screen
 * Creates Stripe Connect account and launches onboarding in WebBrowser.
 */
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { Button } from "@src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@src/constants/tokens";
import { useStore } from "@src/store/useStore";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;

export default function OnboardingStartScreen() {
    const router = useRouter();
    const { session } = useStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleStartOnboarding = async () => {
        setLoading(true);
        setError("");

        // #region agent log
        console.log('[DEBUG H3,H5] start.tsx:entry', { hasSession: !!session, SUPABASE_URL });
        // #endregion

        if (!session) {
            setError("Please sign in first.");
            setLoading(false);
            return;
        }

        if (!SUPABASE_URL) {
            setError("Missing EXPO_PUBLIC_SUPABASE_URL in environment.");
            setLoading(false);
            return;
        }

        try {
            const fullUrl = `${SUPABASE_URL}/functions/v1/winspay-create-onboarding-link`;
            // #region agent log
            console.log('[DEBUG H3,H5] start.tsx:beforeFetch', { fullUrl, hasAccessToken: !!session.access_token });
            // #endregion

            const response = await fetch(
                fullUrl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${session.access_token}`,
                        "x-user-id": session.user.id,
                    },
                }
            );

            // #region agent log
            console.log('[DEBUG H2] start.tsx:afterFetch', { status: response.status, ok: response.ok });
            // #endregion

            const result = await response.json();

            // #region agent log
            console.log('[DEBUG H1] start.tsx:parsedResult', { resultKeys: Object.keys(result), hasSuccess: 'success' in result, successValue: result.success, hasUrl: 'url' in result, urlPresent: !!result.url });
            // #endregion

            if (!response.ok || !result.url) {
                // #region agent log
                console.log('[DEBUG H1] start.tsx:failedCondition', { okCheck: !response.ok, urlCheck: !result.url, resultError: result.error });
                // #endregion
                setError(result.error || "Failed to create onboarding link.");
                setLoading(false);
                return;
            }

            // #region agent log
            console.log('[DEBUG H1] start.tsx:success', { urlLength: result.url?.length });
            // #endregion

            await WebBrowser.openBrowserAsync(result.url);

            setLoading(false);
            router.replace("/onboarding/continue");
        } catch (err) {
            // #region agent log
            console.log('[DEBUG H4] start.tsx:catchBlock', { errorMessage: err instanceof Error ? err.message : String(err) });
            // #endregion
            setError("Network error. Check your connection and Supabase config.");
            setLoading(false);
        }
    };

    return (
        <Screen className="justify-center">
            <View className="flex-1 justify-center px-4">
                <View className="items-center mb-12">
                    <View className="w-20 h-20 bg-primary rounded-[20px] items-center justify-center mb-8 shadow-glow">
                        <Ionicons name="card-outline" size={40} color="#000" />
                    </View>

                    <Text className="text-foreground text-3xl font-bold text-center mb-3 tracking-tight">
                        Set Up Payments
                    </Text>
                    <Text className="text-foreground-muted text-lg text-center leading-relaxed max-w-xs font-medium">
                        Connect your bank account to receive payments through WINSPAY.
                    </Text>
                </View>

                <View className="mb-12">
                    <FeatureItem
                        icon="shield-checkmark-outline"
                        title="Secure & Verified"
                        description="Powered by Stripe Connect"
                    />
                    <FeatureItem
                        icon="cash-outline"
                        title="Fast Payouts"
                        description="Receive funds directly to your bank"
                    />
                    <FeatureItem
                        icon="lock-closed-outline"
                        title="Bank-Level Security"
                        description="Your data is encrypted and protected"
                    />
                </View>

                {error ? (
                    <Text className="text-error text-center mb-4 font-medium">{error}</Text>
                ) : null}
            </View>

            <View className="pb-6">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                    onPress={handleStartOnboarding}
                >
                    Start Setup
                </Button>

                <Text className="text-foreground-subtle text-xs text-center mt-6">
                    You'll be redirected to Stripe to complete verification.
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

