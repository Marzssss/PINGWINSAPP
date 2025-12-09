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
                // PINGWINS Core Palette - Dark Mode Primary
                background: "#0A0A0A",
                surface: {
                    DEFAULT: "#1A1A1A",
                    elevated: "#242424",
                    overlay: "#2E2E2E",
                },
                // Primary Green (Cash-App style)
                primary: {
                    DEFAULT: "#00D632",
                    hover: "#00B82B",
                    muted: "rgba(0, 214, 50, 0.15)",
                },
                // Text Colors
                foreground: {
                    DEFAULT: "#FFFFFF",
                    muted: "#A0A0A0",
                    subtle: "#6B6B6B",
                },
                // Status Colors
                success: "#00D632",
                warning: "#FFB800",
                error: "#FF4444",
                // Border Colors
                border: {
                    DEFAULT: "#2E2E2E",
                    focus: "#00D632",
                },
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
