import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import "react-native-reanimated";
import "../global.css";

import { useStore } from "@src/store/useStore";
import { supabase } from "@src/lib/supabase";
import { useOnboarding } from "../hooks/useOnboarding";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

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
  const { session, setSession, hasCompletedOnboarding, completeOnboarding } = useStore();
  const [authReady, setAuthReady] = useState(false);
  const appState = useRef(AppState.currentState);

  const userId = session?.user?.id ?? null;
  const { loading: onboardingLoading, needsAccount, needsCompletion, ready, refetch } = useOnboarding(userId);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        if (session && !ready) {
          refetch();
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => subscription.remove();
  }, [session, ready, refetch]);

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    if (!authReady) return;

    if (!session) {
      router.replace("/(onboarding)/welcome");
      return;
    }

    if (onboardingLoading) return;

    if (needsAccount) {
      router.replace("/onboarding/start");
      return;
    }

    if (ready && !hasCompletedOnboarding) {
      completeOnboarding();
    }

    if (ready || needsCompletion) {
      router.replace("/(tabs)/home");
    }
  }, [rootNavigationState?.key, authReady, session, onboardingLoading, needsAccount, needsCompletion, ready]);

  return (
    <ThemeProvider value={PingwinsDarkTheme}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
