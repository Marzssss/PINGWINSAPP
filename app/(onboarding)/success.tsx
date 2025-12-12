/**
 * Success Screen
 * Premium checkmark animation with clean typography.
 */
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@src/components/ui/ScreenWrapper";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
    withSequence,
} from "react-native-reanimated";
import { Button } from "@src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "@src/store/useStore";

export default function SuccessScreen() {
    const router = useRouter();
    const { completeOnboarding } = useStore();

    // Animation values
    const checkScale = useSharedValue(0);
    const checkOpacity = useSharedValue(0);
    const textOpacity = useSharedValue(0);
    const textTranslateY = useSharedValue(20);
    const buttonOpacity = useSharedValue(0);

    const checkStyle = useAnimatedStyle(() => ({
        opacity: checkOpacity.value,
        transform: [{ scale: checkScale.value }],
    }));

    const textStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        transform: [{ translateY: textTranslateY.value }],
    }));

    const buttonStyle = useAnimatedStyle(() => ({
        opacity: buttonOpacity.value,
    }));

    useEffect(() => {
        // Animate checkmark
        checkOpacity.value = withSpring(1);
        checkScale.value = withSequence(
            withSpring(1.2, { damping: 10 }),
            withSpring(1, { damping: 15 })
        );

        // Animate text
        textOpacity.value = withDelay(400, withSpring(1));
        textTranslateY.value = withDelay(400, withSpring(0));

        // Animate button
        buttonOpacity.value = withDelay(800, withSpring(1));
    }, []);

    const handleContinue = () => {
        completeOnboarding();
        router.replace("/(tabs)/home");
    };

    return (
        <Screen className="items-center justify-center">
            <View className="flex-1 items-center justify-center w-full">
                {/* Success Checkmark */}
                <Animated.View
                    style={checkStyle}
                    className="w-28 h-28 bg-primary rounded-full items-center justify-center mb-8 shadow-glow"
                >
                    <Ionicons name="checkmark-outline" size={64} color="#000000" />
                </Animated.View>

                {/* Success Text */}
                <Animated.View style={textStyle} className="items-center w-full px-4">
                    <Text className="text-foreground text-3xl font-bold mb-3 text-center tracking-tight">
                        You're all set!
                    </Text>
                    <Text className="text-foreground-muted text-base text-center leading-relaxed">
                        Your account has been created and your device is now securely registered.
                    </Text>
                </Animated.View>
            </View>

            {/* Bottom Button */}
            <Animated.View style={buttonStyle} className="pb-6 w-full">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={handleContinue}
                >
                    Continue to App
                </Button>
            </Animated.View>
        </Screen>
    );
}
