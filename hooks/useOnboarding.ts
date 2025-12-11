/**
 * useOnboarding Hook
 * Fetches user profile and exposes Stripe Connect onboarding state.
 */
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@src/lib/supabase";

interface OnboardingState {
    loading: boolean;
    needsAccount: boolean;
    needsCompletion: boolean;
    ready: boolean;
    error: string | null;
}

interface ProfileData {
    stripe_account_id: string | null;
    onboarding_completed: boolean;
    payouts_enabled: boolean;
}

export function useOnboarding(userId: string | null) {
    const [state, setState] = useState<OnboardingState>({
        loading: true,
        needsAccount: false,
        needsCompletion: false,
        ready: false,
        error: null,
    });

    const fetchProfile = useCallback(async () => {
        if (!userId) {
            setState({
                loading: false,
                needsAccount: false,
                needsCompletion: false,
                ready: false,
                error: null,
            });
            return;
        }

        setState((prev) => ({ ...prev, loading: true, error: null }));

        const { data, error } = await supabase
            .from("profiles")
            .select("stripe_account_id, onboarding_completed, payouts_enabled")
            .eq("id", userId)
            .single();

        if (error) {
            setState({
                loading: false,
                needsAccount: true,
                needsCompletion: false,
                ready: false,
                error: error.message,
            });
            return;
        }

        const profile = data as ProfileData;

        if (!profile.stripe_account_id) {
            setState({
                loading: false,
                needsAccount: true,
                needsCompletion: false,
                ready: false,
                error: null,
            });
            return;
        }

        if (!profile.onboarding_completed) {
            setState({
                loading: false,
                needsAccount: false,
                needsCompletion: true,
                ready: false,
                error: null,
            });
            return;
        }

        if (profile.onboarding_completed && profile.payouts_enabled) {
            setState({
                loading: false,
                needsAccount: false,
                needsCompletion: false,
                ready: true,
                error: null,
            });
            return;
        }

        setState({
            loading: false,
            needsAccount: false,
            needsCompletion: true,
            ready: false,
            error: null,
        });
    }, [userId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { ...state, refetch: fetchProfile };
}

