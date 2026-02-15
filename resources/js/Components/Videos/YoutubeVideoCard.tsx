import { Video } from "@/types/Videos";

type Props = {
    video: Video;
    height?: string;
    width?: string;
};

const YoutubeVideoCard = ({ video, height = "315", width = "560" }: Props) => {
    return (
        <iframe
            id={`ytplayer-${video.id}`}
            title={video.title}
            width={width}
            height={height}
            src={`https://www.youtube.com/embed/${video.external_id}?autoplay=0&mute=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
            allowFullScreen
            className="shadow-2xl rounded-md object-cover object-left border-none w-full h-full"
        />
    );
};

export default YoutubeVideoCard;
