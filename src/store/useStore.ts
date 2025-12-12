/**
 * Global App Store (Zustand)
 * Manages auth state with Supabase sessions.
 */
import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

interface StoreState {
    session: Session | null;
    user: { id: string; email: string | null; phone: string | null } | null;
    isAuthenticated: boolean;
    hasCompletedOnboarding: boolean;

    setSession: (session: Session | null) => void;
    completeOnboarding: () => void;
    resetState: () => void;
}

const initialState = {
    session: null,
    user: null,
    isAuthenticated: false,
    hasCompletedOnboarding: false,
};

export const useStore = create<StoreState>((set) => ({
    ...initialState,

    setSession: (session: Session | null) =>
        set({
            session,
            user: session?.user
                ? {
                    id: session.user.id,
                    email: session.user.email ?? null,
                    phone: (session.user.phone as string | undefined) ?? null,
                }
                : null,
            isAuthenticated: !!session,
        }),

    completeOnboarding: () =>
        set({ hasCompletedOnboarding: true }),

    resetState: () => set(initialState),
}));
