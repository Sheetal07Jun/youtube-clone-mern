import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import VideoCard from "../components/VideoCard";

function Search() {
    const { keyword } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await API.get(
                    `/videos/search/${keyword}`
                );

                setVideos(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchResults();
    }, [keyword]);

    return (
        <div>
            <h2>
                Search Results for "{keyword}"
            </h2>

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

export default Search;