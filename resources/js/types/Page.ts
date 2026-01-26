export type PageSlug = "landing" | "intro_videos";

export type Page = {
    id: number;
    slug: PageSlug;
    title: string;
    is_published: boolean;
};
