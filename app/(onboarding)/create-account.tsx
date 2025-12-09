/**
 * Create Account Screen
 * Phone number input with validation and premium UI.
 */
import React, { useState } from "react";
import { View, Text, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { Button, Input } from "@src/components/ui";
import { useStore } from "@src/store/useStore";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@src/constants/tokens";

export default function CreateAccountScreen() {
    const router = useRouter();
    const { setUser } = useStore();

    const [phone, setPhone] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isValidPhone = phone.length === 10;
    const canSubmit = isValidPhone && agreedToTerms && !loading;

    const handleContinue = async () => {
        if (!canSubmit) return;

        setLoading(true);
        setError("");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Store phone (stubbed)
        setUser({ phone });

        setLoading(false);
        router.push("/(onboarding)/verify-phone");
    };

    return (
        <Screen safeArea>
            <View className="flex-1 pt-8">
                {/* Header */}
                <View className="mb-8">
                    <Text className="text-foreground text-3xl font-bold mb-2 tracking-tight">
                        Create your account
                    </Text>
                    <Text className="text-foreground-muted text-base">
                        Enter your phone number to get started
                    </Text>
                </View>

                {/* Phone Input */}
                <Input
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChangeText={setPhone}
                    phoneFormat
                    error={error}
                    helperText="We'll send you a verification code"
                />

                {/* Terms Checkbox */}
                <Pressable
                    onPress={() => setAgreedToTerms(!agreedToTerms)}
                    className="flex-row items-center mt-6"
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: agreedToTerms }}
                >
                    <View
                        className={`
                            w-6 h-6 rounded border mr-3 items-center justify-center transition-all
                            ${agreedToTerms
                                ? "bg-primary border-primary"
                                : "bg-surface-elevated border-border"
                            }
                        `}
                    >
                        {agreedToTerms && (
                            <Ionicons name="checkmark" size={16} color="#000" />
                        )}
                    </View>
                    <Text className="text-foreground-muted text-sm flex-1 leading-5">
                        I agree to the <Text className="text-primary">Terms of Service</Text> and <Text className="text-primary">Privacy Policy</Text>
                    </Text>
                </Pressable>
            </View>

            {/* Bottom Button */}
            <View className="pb-6">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={!canSubmit}
                    loading={loading}
                    onPress={handleContinue}
                >
                    Continue
                </Button>
            </View>
        </Screen>
    );
}
