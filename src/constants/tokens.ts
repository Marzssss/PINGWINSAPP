/**
 * PINGWINS Design Tokens
 * Single source of truth for colors, spacing, typography, and radii.
 * Follows Apple Human Interface Guidelines for Dark Mode.
 */

export const colors = {
    // Core backgrounds (Apple Dark Mode standard)
    background: "#000000", // Pure black for OLED
    surface: {
        DEFAULT: "#1C1C1E", // Secondary System Background
        elevated: "#2C2C2E", // Tertiary System Background
        overlay: "#3A3A3C", // Modal/Overlay
        inset: "#000000", // Grouped Table Background
    },

    // Primary (Cash-App Green + Apple Polish)
    primary: {
        DEFAULT: "#00D632", // Cash App Green
        hover: "#00B82B",
        active: "#009E25",
        muted: "rgba(0, 214, 50, 0.15)",
        text: "#FFFFFF",
    },

    // Text (Apple iOS System Colors)
    foreground: {
        DEFAULT: "#FFFFFF", // Label
        muted: "#8E8E93", // Secondary Label
        subtle: "#48484A", // Tertiary Label
        inverse: "#000000",
    },

    // Status
    success: "#30D158", // iOS Green
    warning: "#FFD60A", // iOS Yellow
    error: "#FF453A", // iOS Red
    info: "#0A84FF", // iOS Blue

    // Borders & Separators
    border: {
        DEFAULT: "#38383A", // Separator
        subtle: "#2C2C2E",
        focus: "rgba(0, 214, 50, 0.5)", // Focus ring
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
    glow: {
        shadowColor: "#00D632",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
    }
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
