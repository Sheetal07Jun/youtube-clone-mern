import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <p>
                <Link to="/">🏠 Home</Link>
            </p>

            <p>🔥 Trending</p>

            <p>📺 Subscriptions</p>

            <p>
                <Link to="/playlists">
                    📁 Playlists
                </Link>
            </p>
        </div>
    );
}

export default Sidebar;