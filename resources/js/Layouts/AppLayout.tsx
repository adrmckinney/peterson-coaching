import { ThemeProvider } from "@/ContextProviders/ThemeProvider";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
    return <ThemeProvider>{children}</ThemeProvider>;
}
