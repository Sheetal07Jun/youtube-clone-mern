import { Link } from "react-router-dom";

function VideoCard({ video }) {
    return (
        <div className="video-card">

            <Link to={`/video/${video._id}`}>
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="video-thumbnail"
                />

                <h3>{video.title}</h3>
            </Link>

            <Link
                to={`/channel/${video.channelId?._id}`}
            >
                {video.channelId?.channelName}
            </Link>

            <p>{video.views} views</p>

        </div>
    );
}

export default VideoCard;