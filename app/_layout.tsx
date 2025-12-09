import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useStore } from "@src/store/useStore";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent splash screen auto-hide
SplashScreen.preventAutoHideAsync();

// Custom dark theme for PINGWINS
const PingwinsDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#0A0A0A",
    card: "#1A1A1A",
    text: "#FFFFFF",
    border: "#2E2E2E",
    primary: "#00D632",
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const { hasCompletedOnboarding, isAuthenticated } = useStore();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    // Route based on auth state
    if (!hasCompletedOnboarding) {
      router.replace("/(onboarding)/welcome");
    } else if (isAuthenticated) {
      router.replace("/(tabs)/home");
    }
  }, [rootNavigationState?.key, hasCompletedOnboarding, isAuthenticated]);

  return (
    <ThemeProvider value={PingwinsDarkTheme}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}

