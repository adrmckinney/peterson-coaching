import { useFallbackContent } from "@/Hooks/useFallbackContent";
import { Video } from "@/types/Videos";
import TikTokVideoCard from "../Videos/TikTokVideoCard";
import SectionHeadline from "./SectionHeadline";

const FeatureSection = () => {
    const content = useFallbackContent();

    const headline = content.intro_video_section_title.headline;
    const videos = content.intro_video_gallery.videos;

    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <SectionHeadline title={headline} />

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {videos.map((video) => (
                            <div key={video.id} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900 dark:text-white">
                                    {video.title}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col">
                                    <TikTokVideoCard video={video as Video} />
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
