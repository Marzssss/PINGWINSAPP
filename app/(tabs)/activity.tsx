/**
 * Activity Tab
 * Activity history (placeholder UI only).
 */
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { Card } from "@src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@src/constants/tokens";

export default function ActivityScreen() {
    const [filter, setFilter] = useState("All");

    return (
        <Screen scroll safeArea className="pt-4">
            {/* Header */}
            <View className="mb-6">
                <Text className="text-foreground text-3xl font-bold tracking-tight">Activity</Text>
                <Text className="text-foreground-muted text-base mt-1">
                    Your verification and transaction history
                </Text>
            </View>

            {/* Filter Tabs */}
            <View className="flex-row mb-8">
                <FilterTab label="All" active={filter === "All"} onPress={() => setFilter("All")} />
                <FilterTab label="Verifications" active={filter === "Verifications"} onPress={() => setFilter("Verifications")} />
                <FilterTab label="Payments" active={filter === "Payments"} onPress={() => setFilter("Payments")} />
            </View>

            {/* Empty State */}
            <Card variant="default" padding="lg" className="min-h-[240px] justify-center items-center">
                <View className="w-16 h-16 bg-surface-elevated rounded-full items-center justify-center mb-4">
                    <Ionicons name="stats-chart-outline" size={32} color={colors.foreground.muted} />
                </View>
                <Text className="text-foreground text-lg font-semibold mb-2">
                    No activity yet
                </Text>
                <Text className="text-foreground-muted text-center max-w-[200px] leading-relaxed">
                    Your verifications and transactions will appear here
                </Text>
            </Card>
        </Screen>
    );
}

function FilterTab({ label, active = false, onPress }: { label: string; active?: boolean; onPress: () => void }) {
    return (
        <Pressable
            onPress={onPress}
            className={`
                px-5 py-2 mr-3 rounded-full border
                ${active
                    ? "bg-primary border-primary"
                    : "bg-surface border-border-subtle"
                }
            `}
        >
            <Text
                className={`
                    text-sm font-semibold
                    ${active ? "text-background" : "text-foreground-muted"}
                `}
            >
                {label}
            </Text>
        </Pressable>
    );
}
