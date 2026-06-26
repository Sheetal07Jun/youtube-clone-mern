import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function Video() {
    const { id } = useParams();

    const [video, setVideo] = useState(null);

    const [reactions, setReactions] = useState({
        likes: 0,
        dislikes: 0,
    });

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");
    const [recommendedVideos, setRecommendedVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Add View
                await API.post(`/videos/${id}/view`);
                const token = localStorage.getItem("token");

                if (token) {
                    await API.post(
                        `/history/${id}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }

                // Get Updated Video
                const videoRes = await API.get(
                    `/videos/${id}`
                );

                setVideo(videoRes.data);

                const allVideosRes = await API.get("/videos");

                const filteredVideos =
                    allVideosRes.data.filter(
                        (v) =>
                            v._id !== id &&
                            v.category ===
                            videoRes.data.category
                    );

                if (filteredVideos.length > 0) {
                    setRecommendedVideos(
                        filteredVideos.slice(0, 5)
                    );
                } else {
                    const fallbackVideos =
                        allVideosRes.data
                            .filter((v) => v._id !== id)
                            .slice(0, 5);

                    setRecommendedVideos(
                        fallbackVideos
                    );
                }

                // Get Reactions
                const reactionRes = await API.get(
                    `/videos/${id}/reactions`
                );

                setReactions(reactionRes.data);

                // Get Comments
                const commentsRes = await API.get(
                    `/comments/${id}`
                );

                setComments(commentsRes.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const likeVideo = async () => {
        try {
            const token =
                localStorage.getItem("token");

            await API.post(
                `/videos/${id}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const reactionRes = await API.get(
                `/videos/${id}/reactions`
            );

            setReactions(reactionRes.data);
        } catch (error) {
            console.log(error);
        }
    };

    const dislikeVideo = async () => {
        try {
            const token =
                localStorage.getItem("token");

            await API.post(
                `/videos/${id}/dislike`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const reactionRes = await API.get(
                `/videos/${id}/reactions`
            );

            setReactions(reactionRes.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addComment = async () => {
        if (!commentText.trim()) {
            alert("Please write a comment");
            return;
        }
        try {
            const token =
                localStorage.getItem("token");

            await API.post(
                `/comments/${id}`,
                {
                    text: commentText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const commentsRes = await API.get(
                `/comments/${id}`
            );

            setComments(commentsRes.data);

            setCommentText("");
        } catch (error) {
            console.log(error);
        }
    };
    const deleteComment = async (commentId) => {
        try {
            const token = localStorage.getItem("token");

            await API.delete(`/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setComments(
                comments.filter((comment) => comment._id !== commentId)
            );

            alert("Comment deleted");
        } catch (error) {
            console.log(error);
            alert("Delete failed");
        }
    };
    const startEditComment = (comment) => {
        setEditCommentId(comment._id);
        setEditCommentText(comment.text);
    };

    const updateComment = async (commentId) => {
        if (!editCommentText.trim()) {
            alert("Comment cannot be empty");
            return;
        }
        try {
            const token = localStorage.getItem("token");

            await API.put(
                `/comments/${commentId}`,
                { text: editCommentText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComments(
                comments.map((comment) =>
                    comment._id === commentId
                        ? { ...comment, text: editCommentText }
                        : comment
                )
            );

            setEditCommentId(null);
            setEditCommentText("");

            alert("Comment updated");
        } catch (error) {
            console.log(error);
            alert("Update failed");
        }
    };

    if (!video) {
        return <h2>Loading...</h2>;
    }

    const videoId =
        video.videoUrl?.split("v=")[1]?.split("&")[0];

    return (
        <div style={{ padding: "20px" }}>
            <h1>{video.title}</h1>

            <iframe
                width="900"
                height="500"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={video.title}
                frameBorder="0"
                allowFullScreen
            ></iframe>

            <h3>{video.title}</h3>

            <p>{video.description}</p>

            <p>
                <strong>Views:</strong>{" "}
                {video.views}
            </p>

            <p>
                <strong>Category:</strong>{" "}
                {video.category}
            </p>

            <p>
                <strong>Channel:</strong>{" "}
                <Link
                    to={`/channel/${video.channelId?._id}`}
                >
                    {video.channelId?.channelName}
                </Link>
            </p>

            <button onClick={likeVideo}>
                👍 Like ({reactions.likes})
            </button>

            <button
                onClick={dislikeVideo}
                style={{ marginLeft: "10px" }}
            >
                👎 Dislike ({reactions.dislikes})
            </button>

            <hr />

            <h2>🎥 Recommended Videos</h2>

            {recommendedVideos.length === 0 ? (
                <p>No recommendations found.</p>
            ) : (
                recommendedVideos.map((item) => (
                    <div
                        key={item._id}
                        style={{
                            marginBottom: "20px",
                            border: "1px solid #ccc",
                            padding: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <Link
                            to={`/video/${item._id}`}
                        >
                            <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                width="250"
                            />
                        </Link>

                        <h4>{item.title}</h4>

                        <p>
                            {item.views} views
                        </p>
                    </div>
                ))
            )}

            <hr />

            <h2>Comments</h2>

            <textarea
                rows="4"
                cols="60"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) =>
                    setCommentText(e.target.value)
                }
            />

            <br />
            <br />

            <button onClick={addComment}>
                Add Comment
            </button>

            <hr />

            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                comments.map((comment) => (
                    <div
                        key={comment._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                        }}
                    >
                        <strong>{comment.userId?.username}</strong>

                        {editCommentId === comment._id ? (
                            <>
                                <textarea
                                    value={editCommentText}
                                    onChange={(e) => setEditCommentText(e.target.value)}
                                />
                                <br />
                                <button onClick={() => updateComment(comment._id)}>
                                    Save
                                </button>
                                <button onClick={() => setEditCommentId(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <p>{comment.text}</p>
                                <button onClick={() => startEditComment(comment)}>
                                    Edit
                                </button>
                                <button onClick={() => deleteComment(comment._id)}>
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

export default Video;