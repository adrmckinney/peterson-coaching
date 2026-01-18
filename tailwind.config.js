import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // ─────────────────────────
                // Core layout
                // ─────────────────────────
                background: "var(--color-background)",
                onBackground: "var(--color-onBackground)",

                surface: "var(--color-surface)",
                onSurface: "var(--color-onSurface)",

                // ─────────────────────────
                // Brand / semantic
                // ─────────────────────────
                primary: "var(--color-primary)",
                onPrimary: "var(--color-onPrimary)",
                primaryHover: "var(--color-primaryHover)",

                secondary: "var(--color-secondary)",
                onSecondary: "var(--color-onSecondary)",
                secondaryHover: "var(--color-secondaryHover)",

                // ─────────────────────────
                // Accents
                // ─────────────────────────
                primaryAccent: "var(--color-primaryAccent)",
                onPrimaryAccent: "var(--color-onPrimaryAccent)",
                primaryAccentHover: "var(--color-primaryAccentHover)",

                secondaryAccent: "var(--color-secondaryAccent)",
                onSecondaryAccent: "var(--color-onSecondaryAccent)",

                // ─────────────────────────
                // Component / brand-specific
                // ─────────────────────────
                brandBannerBg: "var(--color-brandBannerBg)",
                brandBannerPCC: "var(--color-brandBannerPCC)",
                brandBannerName: "var(--color-brandBannerName)",

                buttonPrimary: "var(--color-buttonPrimary)",
            },
        },
    },

    plugins: [forms],
};
