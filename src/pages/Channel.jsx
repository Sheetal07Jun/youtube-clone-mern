import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function Channel() {
    const { id } = useParams();

    const [channel, setChannel] = useState(null);
    const [subscribers, setSubscribers] = useState(0);
    const [videos, setVideos] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false); const [editVideoId, setEditVideoId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
        fetchChannel();
        fetchSubscribers();
        fetchVideos();
    }, [id]);

    const fetchChannel = async () => {
        try {
            const res = await API.get(`/channels/${id}`);
            setChannel(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSubscribers = async () => {
        try {
            const res = await API.get(
                `/subscriptions/${id}/subscribers`
            );

            setSubscribers(res.data.subscribers);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVideos = async () => {
        try {
            const res = await API.get(
                `/channels/${id}/videos`
            );

            setVideos(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const subscribe = async () => {
        try {
            const token =
                localStorage.getItem("token");

            await API.post(
                `/subscriptions/${id}/subscribe`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsSubscribed(true);

            fetchSubscribers();

            alert("Subscribed Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const unsubscribe = async () => {
        try {
            const token =
                localStorage.getItem("token");

            await API.post(
                `/subscriptions/${id}/unsubscribe`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsSubscribed(false);

            fetchSubscribers();

            alert("Unsubscribed Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const startEditVideo = (video) => {
        setEditVideoId(video._id);
        setEditTitle(video.title);
        setEditDescription(video.description);
    };

    const updateVideo = async (videoId) => {
        if (!editTitle.trim()) {
            alert("Title cannot be empty");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await API.put(
                `/videos/${videoId}`,
                {
                    title: editTitle,
                    description: editDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditVideoId(null);
            setEditTitle("");
            setEditDescription("");

            fetchVideos();

            alert("Video updated successfully");
        } catch (error) {
            console.log(error);
            alert("Video update failed");
        }
    };

    const deleteVideo = async (videoId) => {
        try {
            const token = localStorage.getItem("token");

            await API.delete(`/videos/${videoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setVideos(videos.filter((video) => video._id !== videoId));

            alert("Video deleted successfully");
        } catch (error) {
            console.log(error);
            alert("Video delete failed");
        }
    };
    if (!channel) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="channel-page">
            <h1>{channel.channelName}</h1>

            <p>{channel.description}</p>

            <h3>
                Subscribers: {subscribers}
            </h3>

            {isSubscribed ? (
                <button
                    onClick={unsubscribe}
                    style={{
                        background: "red",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Unsubscribe
                </button>
            ) : (
                <button
                    onClick={subscribe}
                    style={{
                        background: "black",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Subscribe
                </button>
            )}

            <hr />

            <h2>Channel Videos</h2>

            {videos.length === 0 ? (
                <p>No videos uploaded yet.</p>
            ) : (
                videos.map((video) => (
                    <div key={video._id} className="channel-video-card">
                        <Link
                            to={`/video/${video._id}`}
                        >
                            <img
                                src={video.thumbnailUrl}
                                alt={video.title}
                            />
                        </Link>

                        {editVideoId === video._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Edit title"
                                />

                                <br />
                                <br />

                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    placeholder="Edit description"
                                />

                                <br />
                                <br />

                                <button onClick={() => updateVideo(video._id)}>
                                    Save
                                </button>

                                <button onClick={() => setEditVideoId(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h3>{video.title}</h3>

                                <p>
                                    {video.views} views
                                </p>

                                <button onClick={() => startEditVideo(video)}>
                                    Edit
                                </button>

                                <button onClick={() => deleteVideo(video._id)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Channel;