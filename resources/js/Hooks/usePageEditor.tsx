import { SectionContext } from "@/ContextProviders/SectionProvider";
import { SectionTypes } from "@/types/PageSections";
import { useContext } from "react";

export const usePageEditor = () => {
    const ctx = useContext(SectionContext);
    if (!ctx) throw new Error("Must be used inside provider");

    const sections = Object.values(ctx.state.current.sectionsByPage).flat();
    console.log("sections in hook", sections);
    // console.log('sections.find((s) => s.type === type)', sections.find((s) => s.type === ''))
    return {
        // page: ctx.state.current.pages.find((p) => p.id === pageId),
        // sections,
        pages: ctx.state.current.pages,
        hydrated: ctx?.state?.hydrated,
        getSectionByPageId: (pageId: number) =>
            ctx.state.current.sectionsByPage[pageId] ?? [],
        getSectionByType: (type: SectionTypes) =>
            sections.find((s) => s.type === type),

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
