import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <Link to="/">🏠 Home</Link>

            <Link to="/trending">
                🔥 Trending
            </Link>

            <Link to="/subscriptions">
                📺 Subscriptions
            </Link>

            <Link to="/playlists">
                📁 Playlists
            </Link>
        </div>
    );
}

export default Sidebar;