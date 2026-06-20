import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Channel() {
    const { id } = useParams();

    const [channel, setChannel] = useState(null);
    const [subscribers, setSubscribers] =
        useState(0);

    useEffect(() => {
        fetchChannel();
        fetchSubscribers();
    }, [id]);

    const fetchChannel = async () => {
        try {
            const res = await API.get(
                `/channels/${id}`
            );

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

            setSubscribers(
                res.data.subscribers
            );
        } catch (error) {
            console.log(error);
        }
    };

    const subscribe = async () => {
        try {
            const token =
                localStorage.getItem(
                    "token"
                );

            await API.post(
                `/subscriptions/${id}/subscribe`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchSubscribers();

            alert("Subscribed");
        } catch (error) {
            console.log(error);
        }
    };

    const unsubscribe = async () => {
        try {
            const token =
                localStorage.getItem(
                    "token"
                );

            await API.post(
                `/subscriptions/${id}/unsubscribe`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchSubscribers();

            alert("Unsubscribed");
        } catch (error) {
            console.log(error);
        }
    };

    if (!channel)
        return <h2>Loading...</h2>;

    return (
        <div>
            <h1>
                {channel.channelName}
            </h1>

            <p>
                {channel.description}
            </p>

            <h3>
                Subscribers:
                {" "}
                {subscribers}
            </h3>

            <button onClick={subscribe}>
                Subscribe
            </button>

            <button
                onClick={unsubscribe}
                style={{
                    marginLeft: "10px",
                }}
            >
                Unsubscribe
            </button>
        </div>
    );
}

export default Channel;