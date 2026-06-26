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
        <div className="history-page">
            <h1>Watch History</h1>

            {history.length === 0 ? (
                <p>No videos watched yet.</p>
            ) : (
                <div className="history-grid">
                    {history.map((item) => (
                        <div key={item._id} className="history-card">
                            <Link to={`/video/${item.videoId?._id}`}>
                                <img
                                    src={item.videoId?.thumbnailUrl}
                                    alt={item.videoId?.title}
                                    className="history-thumbnail"
                                />
                            </Link>

                            <div className="history-content">
                                <h3 className="history-title">
                                    {item.videoId?.title}
                                </h3>

                                <p className="history-views">
                                    {item.videoId?.views} views
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default History;