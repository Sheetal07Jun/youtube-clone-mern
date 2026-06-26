import { useState } from "react";
import API from "../services/api";

function CreateVideo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] =
        useState("");
    const [thumbnailUrl, setThumbnailUrl] =
        useState("");
    const [videoUrl, setVideoUrl] =
        useState("");
    const [category, setCategory] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !thumbnailUrl || !videoUrl || !category) {
            alert("Please fill all fields");
            return;
        }
        try {
            const token =
                localStorage.getItem("token");

            await API.post(
                "/videos",
                {
                    title,
                    description,
                    thumbnailUrl,
                    videoUrl,
                    category,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(
                "Video uploaded successfully"
            );

            setTitle("");
            setDescription("");
            setThumbnailUrl("");
            setVideoUrl("");
            setCategory("");
        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Upload failed"
            );
        }
    };

    return (
        <div className="create-video-page">
            <form className="create-video-card" onSubmit={handleSubmit}>
                <h1>Upload Video</h1>

                <p className="upload-subtitle">
                    Share your video with everyone
                </p>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Thumbnail URL"
                    value={thumbnailUrl}
                    onChange={(e) =>
                        setThumbnailUrl(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Video URL"
                    value={videoUrl}
                    onChange={(e) =>
                        setVideoUrl(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="Education">Education</option>
                    <option value="Technology">Technology</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Sports">Sports</option>
                    <option value="Music">Music</option>
                    <option value="News">News</option>
                </select>

                <br /><br />

                <button className="create-video-btn" type="submit">
                    Upload Video
                </button>
            </form>
        </div>
    );
}

export default CreateVideo;