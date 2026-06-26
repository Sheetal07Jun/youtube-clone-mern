import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Trending() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchTrendingVideos();
    }, []);

    const fetchTrendingVideos = async () => {
        try {
            const res = await API.get("/videos/trending");
            setVideos(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="trending-page">
            <h1>🔥 Trending Videos</h1>

            {videos.length === 0 ? (
                <p>No videos found.</p>
            ) : (
                videos.map((video) => (
                    <div
                        key={video._id}
                        className="trending-card"
                    >
                        <Link to={`/video/${video._id}`}>
                            <img
                                src={video.thumbnailUrl}
                                alt={video.title}
                                className="trending-thumbnail"
                            />
                        </Link>

                        <div className="trending-info">

                            <Link
                                to={`/video/${video._id}`}
                                className="trending-title"
                            >
                                {video.title}
                            </Link>

                            <Link
                                to={`/channel/${video.channelId?._id}`}
                                className="trending-channel"
                            >
                                {video.channelId?.channelName}
                            </Link>

                            <p className="trending-views">
                                👁 {video.views} views
                            </p>

                            <p className="trending-description">
                                {video.description}
                            </p>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Trending;