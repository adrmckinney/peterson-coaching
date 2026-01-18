import { Video } from "@/types";
import { useEffect } from "react";

type Props = {
    video: Video;
};

const TikTokVideoCard = ({ video }: Props) => {
    useEffect(() => {
        if (!document.getElementById("tiktok-embed-script")) {
            const script = document.createElement("script");
            script.src = "https://www.tiktok.com/embed.js";
            script.async = true;
            script.id = "tiktok-embed-script";
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div
            key={video.external_id}
            className="w-full max-w-sm mx-auto shadow-2xl rounded-md overflow-hidden"
        >
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
