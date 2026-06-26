import { useEffect, useState } from "react";
import API from "../services/api";

function Playlist() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get("/playlists", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPlaylists(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="playlist-page">
                <h2>Loading Playlists...</h2>
            </div>
        );
    }

    return (
        <div className="playlist-page">

            <h1>📁 My Playlists</h1>

            {playlists.length === 0 ? (
                <p>No playlists found.</p>
            ) : (
                <div className="playlist-grid">

                    {playlists.map((playlist) => (

                        <div
                            key={playlist._id}
                            className="playlist-card"
                        >

                            <img
                                src="https://placehold.co/600x350/202020/ffffff?text=Playlist"
                                alt="Playlist"
                                className="playlist-thumbnail"
                            />

                            <div className="playlist-content">

                                <h2>{playlist.name}</h2>

                                <p>
                                    🎬 {playlist.videos?.length || 0} Videos
                                </p>

                                <button className="playlist-btn">
                                    ▶ Open Playlist
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}
        </div>
    );
}

export default Playlist;