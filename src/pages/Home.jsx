import { useEffect, useState } from "react";
import API from "../services/api";
import VideoCard from "../components/VideoCard";

function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await API.get("/videos");
                setVideos(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="home">
            <h1>Home</h1>

            <div className="video-grid">
                {videos.map((video) => (
                    <VideoCard
                        key={video._id}
                        video={video}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;