/**
 * Stripe Connect Onboarding Layout
 * Stack navigation for Connect onboarding flow.
 */
import { Stack } from "expo-router";

export default function OnboardingLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#0A0A0A" },
                animation: "fade",
            }}
        >
            <Stack.Screen name="start" />
            <Stack.Screen name="continue" />
        </Stack>
    );
}

