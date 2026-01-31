import { Layout } from "./Layout";
import { TextBlock } from "./Text";
import { Video } from "./Videos";

export type SectionTypes =
    | "landing_icon"
    | "landing_intro"
    | "intro_video_section_title"
    | "intro_video_gallery";

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
          type: "intro_video_section_title";
          settings: VideoSectionTitleSettings;
      } & PageSectionBase)
    | ({
          type: "intro_video_gallery";
          videos: Video[];
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
