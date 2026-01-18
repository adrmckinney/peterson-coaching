import { usePage } from "@inertiajs/react";
import { PropsWithChildren, useMemo } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const { theme } = usePage().props as {
        theme?: Record<string, string>;
    };
    const style = useMemo(() => {
        console.log("theme", theme);
        if (!theme) return {};

        return Object.fromEntries(
            Object.entries(theme).map(([key, value]) => [
                `--color-${key}`,
                value,
            ]),
        );
    }, [theme]);

    return <div style={style}>{children}</div>;
};
