import { editorReducer } from "@/Reducers/SectionReducer";
import { Page } from "@/types/Page";
import { PageSection } from "@/types/PageSections";
import { EditorState, initialEditorState } from "@/types/ReducerTypes";
import { createContext, ReactNode, useEffect, useReducer } from "react";

type SectionContextValue = {
    state: EditorState;
    initFromServer: (
        pages: Page[],
        sections: PageSection[],
        isEditable: boolean,
    ) => void;
    updateSectionValue: (
        pageId: number,
        sectionId: number,
        path: (string | number)[],
        value: any,
    ) => void;
    resetSectionKey: (
        pageId: number,
        sectionId: number,
        path: (string | number)[],
    ) => void;
    resetSection: (pageId: number, sectionId: number) => void;
    resetPage: (pageId: number) => void;
};

type SectionProviderProps = {
    children: ReactNode;
    pages: Page[];
    sections: PageSection[];
    isEditable: boolean;
};

const initialContext: SectionContextValue = {
    state: initialEditorState,
    initFromServer: () => {},
    updateSectionValue: () => {},
    resetSectionKey: () => {},
    resetSection: () => {},
    resetPage: () => {},
};

export const SectionContext =
    createContext<SectionContextValue>(initialContext);

export const SectionProvider = ({
    children,
    pages,
    sections,
    isEditable,
}: SectionProviderProps) => {
    const [state, dispatch] = useReducer(editorReducer, initialEditorState);

    useEffect(() => {
        dispatch({ type: "INIT_FROM_SERVER", pages, sections, isEditable });
    }, [pages, sections, isEditable]);
    console.log("state in Provider", state);

    const initFromServer = (
        pages: Page[],
        sections: PageSection[],
        isEditable: boolean,
    ) =>
        dispatch({
            type: "INIT_FROM_SERVER",
            pages,
            sections,
            isEditable,
        });

    const updateSectionValue = (
        pageId: number,
        sectionId: number,
        path: (string | number)[],
        value: any,
    ) =>
        dispatch({
            type: "UPDATE_SECTION_VALUE",
            pageId,
            sectionId,
            path,
            value,
        });

    const resetSectionKey = (
        pageId: number,
        sectionId: number,
        path: (string | number)[],
    ) =>
        dispatch({
            type: "RESET_SECTION_KEY",
            pageId,
            sectionId,
            path,
        });

    const resetSection = (pageId: number, sectionId: number) =>
        dispatch({ type: "RESET_SECTION", pageId, sectionId });

    const resetPage = (pageId: number) =>
        dispatch({ type: "RESET_PAGE", pageId });

    return (
        <SectionContext.Provider
            value={{
                state,
                initFromServer,
                updateSectionValue,
                resetSectionKey,
                resetSection,
                resetPage,
            }}
        >
            {children}
        </SectionContext.Provider>
    );
};
