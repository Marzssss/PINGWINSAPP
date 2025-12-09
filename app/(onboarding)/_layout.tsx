/**
 * Onboarding Layout
 * Stack navigation for onboarding flow.
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
            <Stack.Screen name="welcome" />
            <Stack.Screen name="create-account" />
            <Stack.Screen name="verify-phone" />
            <Stack.Screen name="success" />
        </Stack>
    );
}
