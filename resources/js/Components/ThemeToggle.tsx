import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;

        const initialTheme = stored ?? (prefersDark ? "dark" : "light");
        setTheme(initialTheme);
        document.documentElement.classList.toggle(
            "dark",
            initialTheme === "dark",
        );
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border px-3 py-2 text-sm
                 bg-white text-gray-800
                 dark:bg-gray-800 dark:text-gray-100"
        >
            {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
    );
}
