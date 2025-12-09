/**
 * Verify Phone Screen
 * OTP input with numeric keypad.
 */
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { NumericKeypad, Button } from "@src/components/ui";
import { useStore } from "@src/store/useStore";

const OTP_LENGTH = 6;

export default function VerifyPhoneScreen() {
    const router = useRouter();
    const { user, completeOnboarding } = useStore();

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleKeyPress = (key: string) => {
        if (otp.length < OTP_LENGTH) {
            setOtp(otp + key);
            setError("");
        }
    };

    const handleBackspace = () => {
        setOtp(otp.slice(0, -1));
        setError("");
    };

    const handleVerify = async () => {
        if (otp.length !== OTP_LENGTH) return;

        setLoading(true);
        setError("");

        // Simulate verification
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For demo: accept any 6-digit code EXCEPT 000000
        if (otp === "000000") {
            setError("Invalid code. Please try again.");
            setLoading(false);
            return;
        }

        // Success
        completeOnboarding();
        router.push("/(onboarding)/success");
    };

    // Format phone for display
    const formattedPhone = user?.phone
        ? `(${user.phone.slice(0, 3)}) ${user.phone.slice(3, 6)}-${user.phone.slice(6)}`
        : "";

    const canVerify = otp.length === OTP_LENGTH && !loading;

    return (
        <Screen safeArea>
            <View className="flex-1 pt-8">
                {/* Header */}
                <View className="mb-12">
                    <Text className="text-foreground text-3xl font-bold mb-2 tracking-tight">
                        Enter code
                    </Text>
                    <Text className="text-foreground-muted text-base">
                        We sent a code to <Text className="text-foreground">{formattedPhone}</Text>
                    </Text>
                </View>

                {/* OTP Display */}
                <View className="flex-row justify-center mb-8 gap-3">
                    {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                        const isFilled = index < otp.length;
                        return (
                            <View
                                key={index}
                                className={`
                                    w-11 h-14 rounded-xl items-center justify-center border
                                    ${isFilled
                                        ? "bg-surface-elevated border-primary"
                                        : "bg-surface border-border-subtle"
                                    }
                                `}
                            >
                                <Text
                                    className={`
                                        text-2xl font-bold
                                        ${isFilled ? "text-primary" : "text-foreground-subtle"}
                                    `}
                                >
                                    {otp[index] || ""}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Error Message */}
                {error ? (
                    <Text className="text-error text-center mb-4 font-medium">{error}</Text>
                ) : null}

                {/* Resend Link */}
                <Text className="text-foreground-muted text-center">
                    Didn't receive a code?{" "}
                    <Text className="text-primary font-semibold">Resend</Text>
                </Text>
            </View>

            {/* Numeric Keypad */}
            <View>
                <NumericKeypad
                    onKeyPress={handleKeyPress}
                    onBackspace={handleBackspace}
                    disabled={loading}
                />
            </View>

            {/* Verify Button */}
            <View className="px-4 pb-8">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={!canVerify}
                    loading={loading}
                    onPress={handleVerify}
                >
                    Verify Code
                </Button>
            </View>
        </Screen>
    );
}
