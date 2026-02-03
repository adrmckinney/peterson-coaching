import { Video } from "@/types/Videos";
import { useEffect, useState } from "react";
import ConditionalRender from "../ConditionalRender";
import LoadingCircle from "../Loading/LoadingCircle";

type Props = {
    video: Video;
};

const TikTokVideoCard = ({ video }: Props) => {
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        if (!isActivated) return;

        if (
            !document.getElementById(`tiktok-embed-script-${video.external_id}`)
        ) {
            const script = document.createElement("script");
            script.src = "https://www.tiktok.com/embed.js";
            script.async = true;
            script.id = `tiktok-embed-script-${video.external_id}`;
            document.body.appendChild(script);
        }
    }, [isActivated]);

    return (
        <div className="relative w-full max-w-sm mx-auto shadow-2xl rounded-md overflow-hidden">
            {/* Static preview */}
            <ConditionalRender
                condition={isActivated}
                falseRender={
                    <button
                        type="button"
                        onClick={() => setIsActivated(true)}
                        className="relative w-full group"
                    >
                        <img
                            src={video.thumbnail_url}
                            alt={video.title}
                            className="w-full object-cover"
                        />

                        {/* Optional play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
                            <div className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium shadow">
                                ▶ Play
                            </div>
                        </div>
                    </button>
                }
            >
                {/* TikTok embed */}
                <div
                    className={["relative w-full aspect-[9/16] bg-white"].join(
                        " ",
                    )}
                >
                    <blockquote
                        key={video.external_id}
                        className="tiktok-embed"
                        cite={video.url}
                        data-video-id={video.external_id}
                        style={{
                            position: "absolute",
                            inset: 0,
                            maxWidth: "100%",
                        }}
                    >
                        <a
                            href={video.url}
                            style={{
                                border: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <LoadingCircle size="md" />
                        </a>
                    </blockquote>
                </div>
            </ConditionalRender>
        </div>
    );
};

export default TikTokVideoCard;
