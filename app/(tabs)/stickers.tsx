/**
 * Stickers Tab
 * Registered stickers list (placeholder UI only).
 */
import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { Button, Card } from "@src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@src/constants/tokens";
import { supabase } from "@src/lib/supabase";

export default function StickersScreen() {
    const [loading, setLoading] = useState(false);
    const [resultText, setResultText] = useState<string | null>(null);

    async function handleDemoScan() {
        try {
            setLoading(true);
            setResultText(null);

            const mockIdentity = { uid: "PING-TEST-001" };

            const { data, error } = await supabase
                .from("stickers")
                .select("*")
                .eq("uid", mockIdentity.uid)
                .single();

            if (error || !data) {
                console.error(error);
                setResultText("Sticker not found.");
                return;
            }

            const payload = (data as any).payload || {};
            const name = payload.name ?? "Unknown item";
            const verified = payload.verified ? "Yes" : "No";

            setResultText(`Found: ${name} | Verified: ${verified}`);
        } catch (err) {
            console.error(err);
            setResultText("Unexpected error while checking sticker.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Screen scroll safeArea className="pt-4">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-foreground text-3xl font-bold tracking-tight">My Stickers</Text>
                <Button variant="primary" size="sm" icon="add">
                    Add New
                </Button>
            </View>

            {/* Empty State */}
            <Card variant="default" padding="lg" className="mb-8">
                <View className="items-center py-6">
                    <View className="w-20 h-20 bg-surface-elevated rounded-2xl items-center justify-center mb-6 border border-border-subtle">
                        <Ionicons name="qr-code-outline" size={48} color={colors.foreground.muted} />
                    </View>
                    <Text className="text-foreground text-lg font-semibold mb-2">
                        No stickers registered
                    </Text>
                    <Text className="text-foreground-muted text-center max-w-xs mb-6 leading-relaxed">
                        Scan a PINGWINS smart sticker to register it to your device
                    </Text>
                    <Button variant="secondary" size="md" icon="scan-outline">
                        Scan Your First Sticker
                    </Button>

                    <Button
                        variant="primary"
                        className="mt-2"
                        onPress={handleDemoScan}
                        icon="qr-code"
                    >
                        {loading ? "Checking..." : "Run Scan Demo"}
                    </Button>

                    {loading && (
                        <View className="mt-3">
                            <ActivityIndicator />
                        </View>
                    )}

                    {resultText && (
                        <Text className="text-foreground-muted text-xs text-center mt-3">
                            {resultText}
                        </Text>
                    )}
                </View>
            </Card>

            {/* Info Section */}
            <View>
                <Text className="text-foreground text-lg font-bold mb-4">
                    How it works
                </Text>
                <Card variant="filled" padding="md" className="bg-surface-elevated">
                    <InfoItem
                        step="1"
                        title="Scan sticker"
                        description="Use NFC or BLE to detect the smart sticker"
                    />
                    <InfoItem
                        step="2"
                        title="Register"
                        description="The sticker binds to your device permanently"
                    />
                    <InfoItem
                        step="3"
                        title="Verify"
                        description="Others can verify your ownership instantly"
                        isLast
                    />
                </Card>
            </View>
        </Screen>
    );
}

function InfoItem({
    step,
    title,
    description,
    isLast,
}: {
    step: string;
    title: string;
    description: string;
    isLast?: boolean;
}) {
    return (
        <View className={`flex-row items-center py-3 ${!isLast ? "border-b border-white/5" : ""}`}>
            <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-4 shadow-sm">
                <Text className="text-background font-bold">{step}</Text>
            </View>
            <View className="flex-1">
                <Text className="text-foreground font-semibold mb-0.5">{title}</Text>
                <Text className="text-foreground-muted text-xs leading-4">{description}</Text>
            </View>
        </View>
    );
}
