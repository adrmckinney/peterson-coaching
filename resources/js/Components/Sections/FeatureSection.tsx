import { usePageEditor } from "@/Hooks/usePageEditor";
import { VideoSectionTitleSettings } from "@/types/PageSections";
import { Video } from "@/types/Videos";
import TikTokVideoCard from "../Videos/TikTokVideoCard";
import SectionHeadline from "./SectionHeadline";

const FeatureSection = () => {
    const editor = usePageEditor();

    const { isEditable, getSectionByType } = editor;
    const videosSection = getSectionByType("intro_video_gallery");
    const { videos } = videosSection;
    console.log("videos", videos);
    const videoTitleSection = getSectionByType("intro_video_section_title");

    // if (!videoTitleSection) {
    //     throw new Error("Video title section not found");
    // }

    const videoTitleSettings: VideoSectionTitleSettings =
        videoTitleSection?.settings;

    console.log("videoTitleSettings", videoTitleSettings);

    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <SectionHeadline title={videoTitleSettings?.headline?.text} />

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {videos?.map((video: Video) => (
                            <div key={video.id} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900 dark:text-white">
                                    {/* <feature.icon
                                        aria-hidden="true"
                                        className="size-5 flex-none text-indigo-600 dark:text-indigo-400"
                                    /> */}
                                    {video.title}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col">
                                    <TikTokVideoCard video={video} />
                                    <p className="mt-6">
                                        <a
                                            href="#"
                                            className="text-sm/6 font-semibold text-primaryAccent hover:text-accentHover"
                                        >
                                            Learn more{" "}
                                            <span aria-hidden="true">→</span>
                                        </a>
                                    </p>
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
