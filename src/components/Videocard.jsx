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
            </Link>

            <div className="video-info">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="channel"
                    className="channel-avatar"
                />

                <div className="video-details">
                    <Link
                        to={`/video/${video._id}`}
                        className="video-title"
                    >
                        {video.title}
                    </Link>

                    <Link
                        to={`/channel/${video.channelId?._id}`}
                        className="channel-name"
                    >
                        {video.channelId?.channelName}
                    </Link>

                    <p className="video-stats">
                        {video.views} views
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;