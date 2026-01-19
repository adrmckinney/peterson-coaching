import { PageProps } from "@/types";
import { PageSection, VideoSectionTitleSettings } from "@/types/PageSections";
import { Video } from "@/types/Videos";
import { usePage } from "@inertiajs/react";
import TikTokVideoCard from "../Videos/TikTokVideoCard";

type Props = {
    videos: Video[];
    sections: PageSection[];
};

const FeatureSection = () => {
    const { videos, sections } =
        usePage<PageProps<{ videos: Video[]; sections: PageSection[] }>>()
            .props;

    console.log("sections", sections);
    const videoTitleSection = sections?.find(
        (s) => s?.type === "video_section_title",
    );

    if (!videoTitleSection) {
        throw new Error("Video title section not found");
    }

    const videoTitleSettings: VideoSectionTitleSettings =
        videoTitleSection.settings;

    console.log("videoTitleSettings", videoTitleSettings);
    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    {/* <h2
                        className={[
                            "text-base/7 font-semibold",
                            "text-onPrimary",
                        ].join(" ")}
                    >
                        Where to find me
                    </h2> */}
                    <h2
                        className={[
                            "mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-balance",
                            "text-primaryAccent",
                        ].join(" ")}
                    >
                        {videoTitleSettings.headline.text}
                    </h2>
                    {/* <p className="mt-6 text-lg/8 text-onPrimary">
                        You can find me on TikTok and the World Wide Web
                    </p> */}
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {videos?.map((video) => (
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
