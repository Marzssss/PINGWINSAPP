/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                // PINGWINS Neon/Gold Palette - Dark Mode
                background: "#05060B",
                surface: {
                    DEFAULT: "#0B1220",
                    elevated: "#0F1A30",
                    overlay: "#14264A",
                },
                // Primary = Gold
                primary: {
                    DEFAULT: "#D6B76A",
                    hover: "#CBAA5F",
                    muted: "rgba(214, 183, 106, 0.15)",
                },
                // Accent = Neon Cyan
                neon: {
                    DEFAULT: "#38E1FF",
                    muted: "rgba(56, 225, 255, 0.15)",
                },
                // Text Colors
                foreground: {
                    DEFAULT: "#EAF2FF",
                    muted: "#9FB1D1",
                    subtle: "#5C6F91",
                },
                // Status Colors
                success: "#2EE59D",
                warning: "#FFC857",
                error: "#FF4D4D",
                // Border Colors
                border: {
                    DEFAULT: "#1D2A3A",
                    subtle: "#121A2C",
                    focus: "#38E1FF",
                },
            },
            // NativeWind supports `shadow-*` mapping; this is mainly useful on web.
            boxShadow: {
                glow: "0 0 24px rgba(56, 225, 255, 0.35)",
                "glow-gold": "0 0 22px rgba(214, 183, 106, 0.28)",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ["SF Mono", "Consolas", "monospace"],
            },
            spacing: {
                xs: "4px",
                sm: "8px",
                md: "16px",
                lg: "24px",
                xl: "32px",
                "2xl": "48px",
                "3xl": "64px",
            },
            borderRadius: {
                sm: "6px",
                DEFAULT: "8px",
                md: "12px",
                lg: "16px",
                xl: "24px",
                full: "9999px",
            },
            fontSize: {
                xs: ["12px", { lineHeight: "16px" }],
                sm: ["14px", { lineHeight: "20px" }],
                base: ["16px", { lineHeight: "24px" }],
                lg: ["18px", { lineHeight: "28px" }],
                xl: ["20px", { lineHeight: "28px" }],
                "2xl": ["24px", { lineHeight: "32px" }],
                "3xl": ["30px", { lineHeight: "36px" }],
                "4xl": ["36px", { lineHeight: "40px" }],
            },
        },
    },
    plugins: [],
};
