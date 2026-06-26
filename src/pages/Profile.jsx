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
        <div style={{ padding: "20px" }}>
            <h1>👤 My Profile</h1>

            <hr />

            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                }}
            >
                <h2>{user.username}</h2>

                <p>
                    <strong>Email:</strong>{" "}
                    {user.email}
                </p>

                <p>
                    <strong>User ID:</strong>{" "}
                    {user._id}
                </p>

                <p>
                    <strong>Channels:</strong>{" "}
                    {user.channels?.length || 0}
                </p>

                <p>
                    <strong>Subscriptions:</strong>{" "}
                    {user.subscriptions?.length || 0}
                </p>

                <button onClick={logout}>
                    Logout
                </button>
            </div>

            <hr />

            <h2>📂 My Playlists</h2>

            {playlists.length === 0 ? (
                <p>No playlists created yet.</p>
            ) : (
                playlists.map((playlist) => (
                    <div
                        key={playlist._id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <h3>{playlist.name}</h3>

                        <p>
                            Videos:{" "}
                            {playlist.videos?.length || 0}
                        </p>
                    </div>
                ))
            )}

            <hr />

            <h2>🕒 Recently Watched</h2>

            {history.length === 0 ? (
                <p>No watch history yet.</p>
            ) : (
                history.slice(0, 5).map((item) => (
                    <div
                        key={item._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <img
                            src={item.videoId?.thumbnailUrl}
                            alt={item.videoId?.title}
                            width="220"
                        />

                        <h4>
                            {item.videoId?.title}
                        </h4>

                        <p>
                            {item.videoId?.views} views
                        </p>
                    </div>
                ))
            )}

            <hr />

            <h2>🎥 My Uploaded Videos</h2>

            {myVideos.length === 0 ? (
                <p>No uploaded videos yet.</p>
            ) : (
                myVideos.map((video) => (
                    <div
                        key={video._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            width="220"
                        />

                        <h4>{video.title}</h4>

                        <p>
                            {video.views} views
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Profile;