/**
 * WINSPAY Tab
 * Payment dashboard (placeholder UI only).
 */
import React from "react";
import { View, Text } from "react-native";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { Button, Card } from "@src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@src/constants/tokens";

export default function WinspayScreen() {
    return (
        <Screen scroll safeArea className="pt-8">
            {/* Header */}
            <View className="items-center mb-10">
                <Text className="text-foreground-muted text-base font-medium mb-1">WINSPAY Balance</Text>
                <Text className="text-foreground text-[40px] font-bold tracking-tighter text-shadow-sm">$0.00</Text>
            </View>

            {/* Quick Actions */}
            <View className="flex-row mb-10 gap-3">
                <View className="flex-1">
                    <Button variant="primary" size="md" fullWidth icon="arrow-up-outline">
                        Send
                    </Button>
                </View>
                <View className="flex-1">
                    <Button variant="secondary" size="md" fullWidth icon="arrow-down-outline">
                        Request
                    </Button>
                </View>
                <View className="w-14">
                    <Button variant="secondary" size="md" fullWidth icon="add">
                        {""}
                    </Button>
                </View>
            </View>

            {/* Transaction History */}
            <View>
                <Text className="text-foreground text-lg font-bold mb-4">
                    Transactions
                </Text>
                <Card variant="default" padding="lg" className="min-h-[200px] justify-center">
                    <View className="items-center py-6">
                        <View className="w-16 h-16 bg-surface-elevated rounded-full items-center justify-center mb-4">
                            <Ionicons name="card-outline" size={32} color={colors.foreground.muted} />
                        </View>
                        <Text className="text-foreground-muted text-center font-medium">
                            No transactions yet
                        </Text>
                        <Text className="text-foreground-subtle text-sm text-center mt-1">
                            Send or request money to get started
                        </Text>
                    </View>
                </Card>
            </View>
        </Screen>
    );
}
