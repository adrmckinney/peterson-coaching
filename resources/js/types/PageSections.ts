import { Layout } from "./Layout";
import { TextBlock } from "./Text";

export type PageSection =
    | ({
          type: "landing_icon";
          settings: LandingIconSettings;
      } & PageSectionBase)
    | ({
          type: "landing_intro";
          settings: LandingIntroSettings;
      } & PageSectionBase)
    | ({
          type: "video_section_title";
          settings: VideoSectionTitleSettings;
      } & PageSectionBase)
    | ({
          type: "video_gallery";
          settings: VideoGallerySettings;
      } & PageSectionBase);

export type PageSectionBase = {
    id: number;
    page_id: number;
    visible: boolean;
    sort_order?: number;
};

export type LandingIconSettings = {
    layout: Layout;
    icon: {
        pccColor: string;
        scriptColor: string;
        size: string;
    };
};

export type LandingIntroSettings = {
    layout: Layout;
    headline: TextBlock;
    paragraphs: TextBlock[];
};

export type VideoSectionTitleSettings = {
    layout: Layout;
    headline: TextBlock;
};

export type VideoGallerySettings = {
    layout: Layout;
};
