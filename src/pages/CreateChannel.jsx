import { useState } from "react";
import API from "../services/api";

function CreateChannel() {
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [channelBanner, setChannelBanner] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await API.post(
                "/channels",
                {
                    channelName,
                    description,
                    channelBanner,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message);

            setChannelName("");
            setDescription("");
            setChannelBanner("");
        } catch (error) {
            console.log(error.response?.data);
            alert(
                error.response?.data?.message ||
                "Channel creation failed"
            );
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Create Channel</h1>

            <form className="create-channel-card" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Channel Name"
                    value={channelName}
                    onChange={(e) =>
                        setChannelName(e.target.value)
                    }
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Banner URL"
                    value={channelBanner}
                    onChange={(e) =>
                        setChannelBanner(e.target.value)
                    }
                />

                <br /><br />

                <button className="create-channel-btn" type="submit">
                    Create Channel
                </button>
            </form>
        </div>
    );
}

export default CreateChannel;