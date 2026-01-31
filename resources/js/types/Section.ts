import { Video } from "./Videos";

export type Section = {
    id: number;
    page_id: number;
    type: string;
    settings: Record<string, any>;
    visible: boolean;
    videos: Video[];
};
