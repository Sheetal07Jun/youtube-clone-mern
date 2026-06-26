import { useEffect, useState } from "react";
import API from "../services/api";
import VideoCard from "../components/VideoCard";

function Home() {
    const [videos, setVideos] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

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
    const categories = [
        "All",
        "Education",
        "Music",
        "Gaming",
        "News",
        "Sports",
        "Technology",
    ];

    const filterVideos = async (category) => {
        try {
            setActiveCategory(category);

            if (category === "All") {
                const res = await API.get("/videos");
                setVideos(res.data);
            } else {
                const res = await API.get(`/videos/category/${category}`);
                setVideos(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="home">
            <h1>Home</h1>
            <div className="filter-buttons">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => filterVideos(category)}
                        className={
                            activeCategory === category ? "active-filter" : ""
                        }
                    >
                        {category}
                    </button>
                ))}
            </div>

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