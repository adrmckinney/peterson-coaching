import { wayfinder } from "@laravel/vite-plugin-wayfinder";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
        wayfinder({
            patterns: ["app/**/*.php", "routes/**/*.php"],
        }),
    ],
    test: {
        environment: "jsdom",
    },
});
