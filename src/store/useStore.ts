/**
 * Global App Store (Zustand)
 * Stubbed auth state for UI flow testing.
 * No persistence in this phase - pure in-memory state.
 */
import { create } from "zustand";

interface User {
    phone: string;
}

interface AppState {
    // Auth state (stubbed)
    isAuthenticated: boolean;
    hasCompletedOnboarding: boolean;

    // User data (stub)
    user: User | null;

    // Actions
    setAuthenticated: (value: boolean) => void;
    completeOnboarding: () => void;
    setUser: (user: User | null) => void;
    resetState: () => void;
}

const initialState = {
    isAuthenticated: false,
    hasCompletedOnboarding: false,
    user: null,
};

export const useStore = create<AppState>((set) => ({
    ...initialState,

    setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

    completeOnboarding: () =>
        set({ hasCompletedOnboarding: true, isAuthenticated: true }),

    setUser: (user: User | null) => set({ user }),

    resetState: () => set(initialState),
}));
