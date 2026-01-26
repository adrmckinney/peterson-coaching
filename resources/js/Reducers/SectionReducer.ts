import {
    getPathValue,
    groupSectionsByPage,
    removePath,
    setPathValue,
} from "@/helpers/reducerHelpers";
import { EditorAction, EditorState } from "@/types/ReducerTypes";

export const editorReducer = (
    state: EditorState,
    action: EditorAction,
): EditorState => {
    switch (action.type) {
        case "INIT_FROM_SERVER": {
            if (state.hydrated) return state;

            const sectionsByPage = groupSectionsByPage(action.sections);

            return {
                hydrated: true,
                isEditable: action.isEditable,

                persisted: {
                    pages: structuredClone(action.pages),
                    sectionsByPage: structuredClone(sectionsByPage),
                },

                current: {
                    pages: structuredClone(action.pages),
                    sectionsByPage: structuredClone(sectionsByPage),
                },
            };
        }

        case "UPDATE_SECTION_VALUE": {
            const { pageId, sectionId, path, value } = action;

            // const updatePath = (obj: any, p: any[]): any => {
            //     if (p.length === 0) return value;
            //     const [key, ...rest] = p;
            //     return {
            //         ...obj,
            //         [key]: updatePath(obj?.[key], rest),
            //     };
            // };
            const updatePath = (obj: any, p: any[]): any => {
                if (p.length === 0) return value;

                const [key, ...rest] = p;

                // handle array with id lookup
                if (Array.isArray(obj)) {
                    // key is { arrayId: string }
                    if (typeof key === "object" && key.arrayId != null) {
                        return obj.map((item) =>
                            item.id === key.arrayId
                                ? updatePath(item, rest)
                                : item,
                        );
                    } else {
                        // fallback to numeric index
                        return obj.map((item, i) =>
                            i === key ? updatePath(item, rest) : item,
                        );
                    }
                }

                // normal object path
                return {
                    ...obj,
                    [key]: updatePath(obj?.[key], rest),
                };
            };

            return {
                ...state,
                current: {
                    ...state.current,
                    sectionsByPage: {
                        ...state.current.sectionsByPage,
                        [pageId]: state.current.sectionsByPage[pageId].map(
                            (s) =>
                                s.id === sectionId
                                    ? {
                                          ...s,
                                          settings: updatePath(
                                              s.settings,
                                              path,
                                          ),
                                      }
                                    : s,
                        ),
                    },
                },
            };
        }

        case "RESET_SECTION_KEY": {
            const { pageId, sectionId, path } = action;

            const persistedSection = state.persisted.sectionsByPage[
                pageId
            ]?.find((s) => s.id === sectionId);

            if (!persistedSection) return state;

            // example: path = ["paragraphs", 0, "color"];
            const persistedValue = getPathValue(
                persistedSection.settings,
                path,
            );

            return {
                ...state,
                current: {
                    ...state.current,
                    sectionsByPage: {
                        ...state.current.sectionsByPage,
                        [pageId]: state.current.sectionsByPage[pageId].map(
                            (s) => {
                                if (s.id !== sectionId) return s;

                                return {
                                    ...s,
                                    settings:
                                        persistedValue !== undefined
                                            ? setPathValue(
                                                  s.settings,
                                                  path,
                                                  persistedValue,
                                              )
                                            : removePath(s.settings, path),
                                };
                            },
                        ),
                    },
                },
            };
        }

        case "RESET_SECTION": {
            const { pageId, sectionId } = action;

            const persisted = state.persisted.sectionsByPage[pageId].find(
                (s) => s.id === sectionId,
            );

            return {
                ...state,
                current: {
                    ...state.current,
                    sectionsByPage: {
                        ...state.current.sectionsByPage,
                        [pageId]: state.current.sectionsByPage[pageId].map(
                            (s) =>
                                s.id === sectionId
                                    ? structuredClone(persisted!)
                                    : s,
                        ),
                    },
                },
            };
        }

        case "RESET_PAGE": {
            const { pageId } = action;

            return {
                ...state,
                current: {
                    ...state.current,
                    sectionsByPage: {
                        ...state.current.sectionsByPage,
                        [pageId]: structuredClone(
                            state.persisted.sectionsByPage[pageId],
                        ),
                    },
                },
            };
        }

        default:
            return state;
    }
};
