/**
 * Create Account Screen
 * Email authentication with Supabase.
 */
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@src/components/ui/ScreenWrapper";
import { Button, Input } from "@src/components/ui";
import { useStore } from "@src/store/useStore";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@src/lib/supabase";

export default function CreateAccountScreen() {
    const router = useRouter();
    const { setSession } = useStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(true);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 6;
    const canSubmit = isValidEmail && isValidPassword && (isSignUp ? agreedToTerms : true) && !loading;

    const handleAuth = async () => {
        if (!canSubmit) return;

        setLoading(true);
        setError("");

        if (isSignUp) {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) {
                setError(signUpError.message);
                setLoading(false);
                return;
            }

            if (!data.session) {
                setError("Email confirmation is required. Please disable it in Supabase or check your inbox.");
                setLoading(false);
                return;
            }

            setSession(data.session);
            router.push("/onboarding/start");
            return;
        } else {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                setError(signInError.message);
                setLoading(false);
                return;
            }

            if (data.session) {
                setSession(data.session);
            }
        }

        setLoading(false);
    };

    return (
        <Screen safeArea>
            <View className="flex-1 pt-8">
                <View className="mb-8">
                    <Text className="text-foreground text-3xl font-bold mb-2 tracking-tight">
                        {isSignUp ? "Create your account" : "Welcome back"}
                    </Text>
                    <Text className="text-foreground-muted text-base">
                        {isSignUp ? "Enter your email to get started" : "Sign in to continue"}
                    </Text>
                </View>

                <View className="mb-4">
                    <Input
                        label="Email"
                        placeholder="you@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <Input
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    helperText={isSignUp ? "Minimum 6 characters" : undefined}
                    error={error}
                />

                {isSignUp && (
                    <Pressable
                        onPress={() => setAgreedToTerms(!agreedToTerms)}
                        className="flex-row items-center mt-6"
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: agreedToTerms }}
                    >
                        <View
                            className={`
                                w-6 h-6 rounded border mr-3 items-center justify-center
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
                )}

                <Pressable
                    onPress={() => {
                        setIsSignUp(!isSignUp);
                        setError("");
                    }}
                    className="mt-6"
                >
                    <Text className="text-foreground-muted text-center">
                        {isSignUp ? "Already have an account? " : "Don't have an account? "}
                        <Text className="text-primary font-semibold">
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </Text>
                    </Text>
                </Pressable>
            </View>

            <View className="pb-6">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={!canSubmit}
                    loading={loading}
                    onPress={handleAuth}
                >
                    {isSignUp ? "Create Account" : "Sign In"}
                </Button>
            </View>
        </Screen>
    );
}
