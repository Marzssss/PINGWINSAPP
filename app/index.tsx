/**
 * Splash Screen / Entry Point
 * Animated PWID graphic with fade transition to onboarding.
 */
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useStore } from "@src/store/useStore";
import { supabase } from "@src/lib/supabase";
import { shadows } from "@src/constants/tokens";

export default function SplashScreen() {
    const router = useRouter();
    const { session, setSession, hasCompletedOnboarding } = useStore();
    const [authChecked, setAuthChecked] = useState(false);

    // Animation values
    const logoOpacity = useSharedValue(0);
    const logoScale = useSharedValue(0.8);
    const textOpacity = useSharedValue(0);
    const containerOpacity = useSharedValue(1);

    const logoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));

    const textStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
    }));

    const containerStyle = useAnimatedStyle(() => ({
        opacity: containerOpacity.value,
    }));

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setAuthChecked(true);
        });
    }, []);

    useEffect(() => {
        logoOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
        logoScale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) });
        textOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
    }, []);

    useEffect(() => {
        if (!authChecked) return;

        const timer = setTimeout(() => {
            containerOpacity.value = withTiming(0, { duration: 300 });

            setTimeout(() => {
                if (!session) {
                    router.replace("/(onboarding)/welcome");
                } else if (hasCompletedOnboarding) {
                    router.replace("/(tabs)/home");
                } else {
                    router.replace("/(onboarding)/welcome");
                }
            }, 300);
        }, 2000);

        return () => clearTimeout(timer);
    }, [authChecked, session, hasCompletedOnboarding]);

    return (
        <Animated.View
            style={containerStyle}
            className="flex-1 bg-background items-center justify-center"
        >
            {/* PWID-Inspired Logo */}
            <Animated.View style={logoStyle} className="items-center">
                <View
                    className="w-24 h-24 bg-surface-elevated rounded-2xl items-center justify-center mb-6 border border-primary/35"
                    style={shadows.glowGold}
                >
                    <Image
                        source={require("../assets/images/pingwins-logo.png")}
                        style={{ width: 84, height: 84 }}
                        resizeMode="contain"
                        accessibilityLabel="PINGWINS logo"
                    />
                </View>
            </Animated.View>

            {/* Brand Text */}
            <Animated.View style={textStyle} className="items-center">
                <Text className="text-foreground text-3xl font-bold tracking-wide">
                    PINGWINS
                </Text>
                <Text className="text-foreground-muted text-base mt-2">
                    Secure Device Identity
                </Text>
            </Animated.View>
        </Animated.View>
    );
}
