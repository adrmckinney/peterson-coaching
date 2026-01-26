import { SectionProvider } from "@/ContextProviders/SectionProvider";
import { ThemeProvider } from "@/ContextProviders/ThemeProvider";
import { PageProps } from "@/types";
import { Page } from "@/types/Page";
import { PageSection } from "@/types/PageSections";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
    const { pages, sections, isEditable } = usePage<
        PageProps<{
            pages: Page[];
            sections: PageSection[];
            isEditable: boolean;
        }>
    >().props;
    return (
        <ThemeProvider>
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
