/**
 * Stripe Connect Onboarding Continue Screen
 * For users who need to complete or resume Stripe onboarding.
 */
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { Button } from "@src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@src/lib/supabase";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;

export default function OnboardingContinueScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const checkStatus = async () => {
        setChecking(true);
        setError("");
        setStatusMessage("");

        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData?.session;

        if (!session) {
            setError("Session expired. Please sign in again.");
            setChecking(false);
            return;
        }

        const response = await fetch(
            `${SUPABASE_URL}/functions/v1/check-onboarding-status`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`,
                },
            }
        );

        const result = await response.json();

        if (result.ready) {
            router.replace("/(tabs)/home");
            return;
        }

        if (result.needsAccount) {
            router.replace("/onboarding/start");
            return;
        }

        setStatusMessage("Still waiting for Stripe…");
        setTimeout(() => setStatusMessage(""), 3000);
        setChecking(false);
    };

    const handleContinueOnboarding = async () => {
        setLoading(true);
        setError("");

        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData?.session;

        // #region agent log
        console.log('[DEBUG H3,H5] continue.tsx:entry', { hasSession: !!session, SUPABASE_URL });
        // #endregion

        if (!session) {
            setError("Please sign in first.");
            setLoading(false);
            return;
        }

        try {
            const fullUrl = `${SUPABASE_URL}/functions/v1/winspay-create-onboarding-link`;
            // #region agent log
            console.log('[DEBUG H3,H5] continue.tsx:beforeFetch', { fullUrl, hasAccessToken: !!session.access_token });
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
            console.log('[DEBUG H2] continue.tsx:afterFetch', { status: response.status, ok: response.ok });
            // #endregion

            const result = await response.json();

            // #region agent log
            console.log('[DEBUG H1] continue.tsx:parsedResult', { resultKeys: Object.keys(result), hasSuccess: 'success' in result, successValue: result.success, hasUrl: 'url' in result, urlPresent: !!result.url });
            // #endregion

            if (!response.ok || !result.url) {
                // #region agent log
                console.log('[DEBUG H1] continue.tsx:failedCondition', { okCheck: !response.ok, urlCheck: !result.url, resultError: result.error });
                // #endregion
                setError(result.error || "Failed to create onboarding link.");
                setLoading(false);
                return;
            }

            // #region agent log
            console.log('[DEBUG H1] continue.tsx:success', { urlLength: result.url?.length });
            // #endregion

            await WebBrowser.openBrowserAsync(result.url);
            setLoading(false);

            await checkStatus();
        } catch (err) {
            // #region agent log
            console.log('[DEBUG H4] continue.tsx:catchBlock', { errorMessage: err instanceof Error ? err.message : String(err) });
            // #endregion
            setError("Network error. Check your connection and Supabase config.");
            setLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
    }, []);

    return (
        <Screen className="justify-center">
            <View className="flex-1 justify-center px-4">
                <View className="items-center mb-12">
                    <View className="w-20 h-20 bg-surface-elevated rounded-[20px] items-center justify-center mb-8 border border-border-subtle">
                        <Ionicons name="time-outline" size={40} color="#FFD60A" />
                    </View>

                    <Text className="text-foreground text-3xl font-bold text-center mb-3 tracking-tight">
                        Complete Setup
                    </Text>
                    <Text className="text-foreground-muted text-lg text-center leading-relaxed max-w-xs font-medium">
                        Your payment setup is incomplete. Continue to finish verification.
                    </Text>
                </View>

                {error ? (
                    <Text className="text-error text-center mb-4 font-medium">{error}</Text>
                ) : null}
            </View>

            <View className="pb-6 gap-3">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                    onPress={handleContinueOnboarding}
                >
                    Continue Setup
                </Button>

                <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    loading={checking}
                    onPress={checkStatus}
                >
                    Check Status
                </Button>

                {statusMessage ? (
                    <View className="bg-surface-elevated rounded-xl px-4 py-3 mt-2">
                        <Text className="text-foreground-muted text-sm text-center font-medium">
                            {statusMessage}
                        </Text>
                    </View>
                ) : null}
            </View>
        </Screen>
    );
}

