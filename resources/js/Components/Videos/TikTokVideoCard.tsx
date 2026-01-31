import { Video } from "@/types/Videos";
import { useEffect, useState } from "react";
import ConditionalRender from "../ConditionalRender";
import LoadingBounceDots from "../Loading/LoadingBounceDots";

type Props = {
    video: Video;
};

const TikTokVideoCard = ({ video }: Props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // load script once
        if (!document.getElementById("tiktok-embed-script")) {
            const script = document.createElement("script");
            script.src = "https://www.tiktok.com/embed.js";
            script.async = true;
            script.id = "tiktok-embed-script";
            document.body.appendChild(script);
        }

        // hide loader after TikTok likely rendered
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className={[
                "relative w-full max-w-sm mx-auto shadow-2xl rounded-md overflow-hidden",
                loading ? "h-[700px]" : "",
            ].join(" ")}
        >
            <ConditionalRender condition={loading}>
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
                    <LoadingBounceDots />
                </div>
            </ConditionalRender>

            <blockquote
                className="tiktok-embed"
                cite={video.url}
                data-video-id={video.external_id}
                style={{ maxWidth: "100%" }}
            >
                <section>
                    <a href={video.url}>{video.title}</a>
                </section>
            </blockquote>
        </div>
    );
};

export default TikTokVideoCard;
