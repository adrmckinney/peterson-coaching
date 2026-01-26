import { SectionContext } from "@/ContextProviders/SectionProvider";
import { useContext } from "react";

export const usePageEditor = () => {
    const ctx = useContext(SectionContext);
    console.log("context in hook", ctx);
    if (!ctx) throw new Error("Must be used inside provider");
    // console.log("pageId", pageId);
    // const sections = ctx.state.current.sectionsByPage[pageId] ?? [];
    console.log("ctx.state.current", ctx.state.current);

    return {
        // page: ctx.state.current.pages.find((p) => p.id === pageId),
        // sections,
        pages: ctx.state.current.pages,
        hydrated: ctx?.state?.hydrated,
        getSectionByPageId: (pageId: number) =>
            ctx.state.current.sectionsByPage[pageId] ?? [],
        // getSectionByType: (pageId: number, type: string) => ctx.state.current.sectionsByPage() sections.find((s) => s.type === type),

        updateSectionValue: (
            pageId: number,
            sectionId: number,
            path: (string | number)[],
            value: any,
        ) => ctx.updateSectionValue(pageId, sectionId, path, value),

        resetSectionKey: (
            pageId: number,
            sectionId: number,
            path: (string | number)[],
        ) => ctx.resetSectionKey(pageId, sectionId, path),

        resetSection: (pageId: number, sectionId: number) =>
            ctx.resetSection(pageId, sectionId),

        resetPage: (pageId: number) => ctx.resetPage(pageId),

        isEditable: ctx.state.isEditable,
    };
};
