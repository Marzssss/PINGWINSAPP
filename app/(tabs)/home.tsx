/**
 * Home Tab
 * Main dashboard with scan/verify functionality.
 */
import React from "react";
import { View, Text } from "react-native";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { Button, Card } from "@src/components/ui";
import { useStore } from "@src/store/useStore";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@src/constants/tokens";

export default function HomeScreen() {
    const { user } = useStore();

    return (
        <Screen scroll safeArea className="pt-4">
            {/* Header */}
            <View className="mb-8 flex-row justify-between items-center">
                <View>
                    <Text className="text-foreground-muted text-base font-medium">Welcome back,</Text>
                    <Text className="text-foreground text-2xl font-bold tracking-tight">
                        {user?.phone ? `+1 ${user.phone.slice(0, 3)}...` : "User"}
                    </Text>
                </View>
                <View className="w-10 h-10 rounded-full bg-surface-elevated items-center justify-center border border-border-subtle">
                    <Ionicons name="person" size={20} color={colors.foreground.DEFAULT} />
                </View>
            </View>

            {/* Quick Actions */}
            <View className="flex-row mb-8 gap-4">
                <View className="flex-1">
                    <Button variant="primary" size="md" fullWidth icon="scan-outline">
                        Scan Sticker
                    </Button>
                </View>
                <View className="flex-1">
                    <Button variant="secondary" size="md" fullWidth icon="checkmark-circle-outline">
                        Verify
                    </Button>
                </View>
            </View>

            {/* Stats Card */}
            <Card variant="elevated" padding="lg" className="mb-8">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-foreground-muted text-sm font-medium uppercase tracking-wider">Overview</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors.foreground.muted} />
                </View>
                <View className="flex-row justify-between">
                    <StatItem label="Stickers" value="0" />
                    <View className="w-[1px] bg-white/10 h-12" />
                    <StatItem label="Verified" value="0" />
                    <View className="w-[1px] bg-white/10 h-12" />
                    <StatItem label="Pending" value="0" />
                </View>
            </Card>

            {/* Recent Activity */}
            <View className="mb-6">
                <Text className="text-foreground text-lg font-bold mb-4">
                    Recent Activity
                </Text>
                <Card variant="default" padding="md" className="min-h-[200px] justify-center">
                    <View className="items-center py-8">
                        <View className="w-16 h-16 bg-surface-elevated rounded-full items-center justify-center mb-4">
                            <Ionicons name="file-tray-outline" size={32} color={colors.foreground.muted} />
                        </View>
                        <Text className="text-foreground-muted text-center font-medium">
                            No recent activity
                        </Text>
                        <Text className="text-foreground-subtle text-sm text-center mt-1">
                            Scan a PINGWINS sticker to get started
                        </Text>
                    </View>
                </Card>
            </View>
        </Screen>
    );
}

function StatItem({ label, value }: { label: string; value: string }) {
    return (
        <View className="items-center flex-1">
            <Text className="text-foreground text-2xl font-bold font-mono">{value}</Text>
            <Text className="text-foreground-muted text-xs font-medium mt-1">{label}</Text>
        </View>
    );
}
