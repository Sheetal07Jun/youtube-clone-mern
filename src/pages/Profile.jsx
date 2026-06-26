import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
    const [user, setUser] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [history, setHistory] = useState([]);
    const [myVideos, setMyVideos] = useState([]);

    useEffect(() => {
        fetchProfile();
        fetchPlaylists();
        fetchHistory();
        fetchMyVideos();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get(
                "/auth/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPlaylists = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get(
                "/playlists",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setPlaylists(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get(
                "/history",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setHistory(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchMyVideos = async () => {
        try {
            const token = localStorage.getItem("token");

            const profileRes = await API.get(
                "/auth/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const userId = profileRes.data._id;

            const videosRes = await API.get("/videos");

            const uploadedVideos =
                videosRes.data.filter(
                    (video) =>
                        video.uploader?._id === userId
                );

            setMyVideos(uploadedVideos);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };

    if (!user) {
        return (
            <div style={{ padding: "20px" }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-header-card">
                <img
                    src="/avtaar.avif"
                    alt="Profile"
                    className="profile-avatar"
                />

                <div className="profile-user-info">
                    <h1>{user.username}</h1>
                    <p>{user.email}</p>

                    <div className="profile-stats">
                        <div>
                            <h3>{user.channels?.length || 0}</h3>
                            <span>Channels</span>
                        </div>

                        <div>
                            <h3>{user.subscriptions?.length || 0}</h3>
                            <span>Subscriptions</span>
                        </div>

                        <div>
                            <h3>{myVideos.length}</h3>
                            <span>Videos</span>
                        </div>
                    </div>

                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="profile-section">
                <h2>📂 My Playlists</h2>

                {playlists.length === 0 ? (
                    <p className="empty-text">No playlists created yet.</p>
                ) : (
                    <div className="profile-grid">
                        {playlists.map((playlist) => (
                            <div key={playlist._id} className="profile-mini-card">
                                <h3>{playlist.name}</h3>
                                <p>{playlist.videos?.length || 0} videos</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="profile-section">
                <h2>🕒 Recently Watched</h2>

                {history.length === 0 ? (
                    <p className="empty-text">No watch history yet.</p>
                ) : (
                    <div className="profile-grid">
                        {history.slice(0, 5).map((item) => (
                            <div key={item._id} className="profile-video-card">
                                <img
                                    src={item.videoId?.thumbnailUrl}
                                    alt={item.videoId?.title}
                                />
                                <h4>{item.videoId?.title}</h4>
                                <p>{item.videoId?.views} views</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="profile-section">
                <h2>🎥 My Uploaded Videos</h2>

                {myVideos.length === 0 ? (
                    <p className="empty-text">No uploaded videos yet.</p>
                ) : (
                    <div className="profile-grid">
                        {myVideos.map((video) => (
                            <div key={video._id} className="profile-video-card">
                                <img src={video.thumbnailUrl} alt={video.title} />
                                <h4>{video.title}</h4>
                                <p>{video.views} views</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
    export default Profile;