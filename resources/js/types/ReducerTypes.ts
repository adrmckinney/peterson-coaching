import { Page } from "./Page";
import { PageSection } from "./PageSections";

export type EditorState = {
    hydrated: boolean;
    isEditable: boolean;

    persisted: {
        pages: Page[];
        sectionsByPage: Record<number, PageSection[]>;
    };

    current: {
        pages: Page[];
        sectionsByPage: Record<number, PageSection[]>;
    };
};

export const initialEditorState: EditorState = {
    hydrated: false,
    isEditable: false,

    persisted: {
        pages: [],
        sectionsByPage: {},
    },

    current: {
        pages: [],
        sectionsByPage: {},
    },
};

export type EditorAction =
    | {
          type: "INIT_FROM_SERVER";
          pages: Page[];
          sections: PageSection[];
          isEditable: boolean;
      }
    | {
          type: "UPDATE_SECTION_VALUE";
          pageId: number;
          sectionId: number;
          path: (string | number)[];
          value: any;
      }
    | {
          type: "RESET_SECTION_KEY";
          pageId: number;
          sectionId: number;
          path: (string | number)[];
      }
    | { type: "RESET_SECTION"; pageId: number; sectionId: number }
    | { type: "RESET_PAGE"; pageId: number }
    | { type: "RESET_ALL" };
