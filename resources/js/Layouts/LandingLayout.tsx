import BrandBanner from "@/Assets/SVG/BrandBanner";
import useLogWindowBreakpoint from "@/Hooks/useLogWindowBreakpoint";
import { PropsWithChildren } from "react";

export default function LandingLayout({ children }: PropsWithChildren) {
    useLogWindowBreakpoint();
    return (
        <div className="flex min-h-screen flex-col items-center bg-slate-300">
            <header className="w-full">
                <BrandBanner />
            </header>

            <div className="w-full overflow-hidden px-0 py-0 shadow-md max-w-full">
                {children}
            </div>
        </div>
    );
}
