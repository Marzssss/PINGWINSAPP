/**
 * PINGWINS Design Tokens
 * Single source of truth for colors, spacing, typography, and radii.
 * Follows Apple Human Interface Guidelines for Dark Mode.
 */

export const colors = {
    // Core backgrounds (Apple Dark Mode standard)
    background: "#05060B",
    surface: {
        DEFAULT: "#0B1220",
        elevated: "#0F1A30",
        overlay: "#14264A",
        inset: "#05060B",
    },

    // Primary (Gold)
    primary: {
        DEFAULT: "#D6B76A",
        hover: "#CBAA5F",
        active: "#B8913E",
        muted: "rgba(214, 183, 106, 0.15)",
        text: "#05060B",
    },

    // Text (Apple iOS System Colors)
    foreground: {
        DEFAULT: "#EAF2FF",
        muted: "#9FB1D1",
        subtle: "#5C6F91",
        inverse: "#05060B",
    },

    // Status
    success: "#2EE59D",
    warning: "#FFC857",
    error: "#FF4D4D",
    info: "#38E1FF", // Neon cyan

    // Borders & Separators
    border: {
        DEFAULT: "#1D2A3A",
        subtle: "#121A2C",
        focus: "rgba(56, 225, 255, 0.60)",
    },

    // Overlays
    black: {
        transparent: "rgba(0,0,0,0.5)",
    }
} as const;

export const spacing = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
    "safe-horizontal": 20, // Standard side padding
    "safe-bottom": 34,    // Home indicator safe zone
} as const;

export const radii = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    "2xl": 32,
    full: 9999,
} as const;

export const typography = {
    fontSize: {
        xs: 11,
        sm: 13,
        base: 15, // iOS Body Standard
        lg: 17,   // iOS Headline Standard
        xl: 20,
        "2xl": 22,
        "3xl": 28,
        "4xl": 34, // iOS Large Title
        display: 40,
    },
    lineHeight: {
        xs: 13,
        sm: 18,
        base: 20,
        lg: 22,
        xl: 25,
        "2xl": 28,
        "3xl": 34,
        "4xl": 41,
        display: 48,
    },
    weight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
    }
} as const;

export const shadows = {
    none: {
        shadowColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    sm: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    md: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    lg: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    glowNeon: {
        shadowColor: colors.info,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.45,
        shadowRadius: 14,
        elevation: 10,
    },
    glowGold: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.28,
        shadowRadius: 12,
        elevation: 8,
    },
} as const;

export const timing = {
    quick: 150,
    default: 300,
    slug: 500,
} as const;

// Combined touch target size for accessibility
export const touchArea = {
    min: 44,
} as const;
