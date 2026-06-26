import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get(
                "/subscriptions/my-subscriptions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSubscriptions(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="subscriptions-page">
            <h1>📺 My Subscriptions</h1>

            {subscriptions.length === 0 ? (
                <p>You haven't subscribed to any channel yet.</p>
            ) : (
                <div className="subscriptions-grid">
                    {subscriptions.map((channel) => (
                        <Link
                            key={channel._id}
                            to={`/channel/${channel._id}`}
                            className="subscription-link"
                        >
                            <div className="subscription-card">

                                <img
                                    src="/avtaar.avif"
                                    alt="Channel"
                                    className="subscription-avatar"
                                />


                                <h3>{channel.channelName}</h3>

                                <p>{channel.description}</p>

                                <span>
                                    👥 {channel.subscribers} Subscribers
                                </span>

                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Subscriptions;