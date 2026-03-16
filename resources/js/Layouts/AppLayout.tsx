import { SectionProvider } from "@/ContextProviders/SectionProvider";
import { ThemeProvider } from "@/ContextProviders/ThemeProvider";
import { PageProps } from "@/types";
import { Page } from "@/types/Page";
import { PageSection } from "@/types/PageSections";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
    const { flash, pages, sections, isEditable } = usePage<
        PageProps<{
            pages: Page[];
            sections: PageSection[];
            isEditable: boolean;
            flash?: {
                success?: string;
                error?: string;
            };
        }>
    >().props;

    return (
        <ThemeProvider>
            {/* <ConditionalRender condition={!!flash?.success || !!flash?.error}>
                <div
                    className={[
                        "absolute mb-6 rounded-md px-4 py-3",
                        flash?.success
                            ? "bg-green-600/20 border border-green-600 text-green-200"
                            : "bg-red-600/20 border border-red-600 text-red-200",
                    ].join(" ")}
                >
                    {flash?.success}
                </div>
            </ConditionalRender> */}
            <SectionProvider
                pages={pages}
                sections={sections}
                isEditable={isEditable}
            >
                {children}
            </SectionProvider>
        </ThemeProvider>
    );
}
