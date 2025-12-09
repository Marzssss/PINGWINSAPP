/**
 * Settings Tab
 * Account settings and app configuration.
 */
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { Card, Button } from "@src/components/ui";
import { useStore } from "@src/store/useStore";
import { getDeviceIdentity } from "@src/utils/deviceIdentity";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@src/constants/tokens";

export default function SettingsScreen() {
    const { user, resetState } = useStore();
    const deviceIdentity = getDeviceIdentity();

    const handleLogout = () => {
        resetState();
    };

    return (
        <Screen scroll safeArea className="pt-4">
            {/* Header */}
            <View className="mb-6">
                <Text className="text-foreground text-3xl font-bold tracking-tight">Settings</Text>
            </View>

            {/* Account Section */}
            <View className="mb-8">
                <Text className="text-foreground-muted text-xs font-semibold mb-2 uppercase tracking-widest pl-2">
                    Account
                </Text>
                <Card variant="default" padding="none" className="overflow-hidden">
                    <SettingsItem
                        icon="call-outline"
                        label="Phone Number"
                        value={user?.phone ? `+1 ${user.phone}` : "Not set"}
                    />
                    <SettingsItem
                        icon="phone-portrait-outline"
                        label="Device Platform"
                        value={deviceIdentity.platform.toUpperCase()}
                        isLast
                    />
                </Card>
            </View>

            {/* Preferences Section */}
            <View className="mb-8">
                <Text className="text-foreground-muted text-xs font-semibold mb-2 uppercase tracking-widest pl-2">
                    Preferences
                </Text>
                <Card variant="default" padding="none" className="overflow-hidden">
                    <SettingsItem icon="notifications-outline" label="Notifications" value="Enabled" />
                    <SettingsItem icon="radio-button-on-outline" label="Haptic Feedback" value="On" />
                    <SettingsItem icon="moon-outline" label="Appearance" value="Dark" isLast />
                </Card>
            </View>

            {/* About Section */}
            <View className="mb-8">
                <Text className="text-foreground-muted text-xs font-semibold mb-2 uppercase tracking-widest pl-2">
                    About
                </Text>
                <Card variant="default" padding="none" className="overflow-hidden">
                    <SettingsItem icon="information-circle-outline" label="Version" value="1.0.0" />
                    <SettingsItem icon="document-text-outline" label="Terms of Service" chevron />
                    <SettingsItem icon="shield-checkmark-outline" label="Privacy Policy" chevron isLast />
                </Card>
            </View>

            {/* Logout */}
            <View className="mt-2 mb-8">
                <Button variant="ghost" size="md" fullWidth onPress={handleLogout}>
                    <Text className="text-error font-semibold">Log Out</Text>
                </Button>
            </View>

            {/* Dev Tools */}
            <View className="pt-6 border-t border-border-subtle mb-10">
                <Text className="text-foreground-subtle text-xs text-center mb-4 uppercase">
                    Developer Tools
                </Text>
                <Button variant="secondary" size="sm" fullWidth onPress={resetState}>
                    Reset App State
                </Button>
            </View>
        </Screen>
    );
}

function SettingsItem({
    icon,
    label,
    value,
    chevron,
    isLast,
}: {
    icon?: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    chevron?: boolean;
    isLast?: boolean;
}) {
    return (
        <Pressable
            className={`
                flex-row justify-between items-center px-4 py-4
                bg-surface active:bg-surface-elevated
                ${!isLast ? "border-b border-border-subtle" : ""}
            `}
        >
            <View className="flex-row items-center">
                {icon && (
                    <View className="w-8 items-center mr-3">
                        <Ionicons name={icon} size={20} color={colors.foreground.DEFAULT} />
                    </View>
                )}
                <Text className="text-foreground text-base font-medium">{label}</Text>
            </View>

            <View className="flex-row items-center">
                {value && (
                    <Text className="text-foreground-muted text-base mr-2">{value}</Text>
                )}
                {chevron && <Ionicons name="chevron-forward" size={16} color={colors.foreground.muted} />}
            </View>
        </Pressable>
    );
}
