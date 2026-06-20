import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Video
                const videoRes = await API.get(
                    `/videos/${id}`
                );

                setVideo(videoRes.data);

                // Reactions
                const reactionRes = await API.get(
                    `/videos/${id}/reactions`
                );

                setReactions(reactionRes.data);

                // Comments
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

    if (!video) {
        return <h2>Loading...</h2>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>{video.title}</h1>

            <p>{video.description}</p>

            <p>Views: {video.views}</p>

            <p>
                Channel:
                {video.channelId?.channelName}
            </p>

            <button onClick={likeVideo}>
                👍 Like ({reactions.likes})
            </button>

            <button
                onClick={dislikeVideo}
                style={{
                    marginLeft: "10px",
                }}
            >
                👎 Dislike ({reactions.dislikes})
            </button>

            <hr />

            <h2>Comments</h2>

            <textarea
                rows="4"
                cols="50"
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
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <strong>
                            {comment.userId?.username}
                        </strong>

                        <p>{comment.text}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Video;