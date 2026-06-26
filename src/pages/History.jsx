import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const token =
                localStorage.getItem("token");

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

    return (
        <div style={{ padding: "20px" }}>
            <h1>Watch History</h1>

            {history.length === 0 ? (
                <p>No videos watched yet.</p>
            ) : (
                history.map((item) => (
                    <div
                        key={item._id}
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <Link
                            to={`/video/${item.videoId?._id}`}
                        >
                            <img
                                src={
                                    item.videoId
                                        ?.thumbnailUrl
                                }
                                alt={
                                    item.videoId
                                        ?.title
                                }
                                width="250"
                            />
                        </Link>

                        <h3>
                            {
                                item.videoId
                                    ?.title
                            }
                        </h3>

                        <p>
                            {
                                item.videoId
                                    ?.views
                            }{" "}
                            views
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default History;