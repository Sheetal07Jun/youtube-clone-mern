import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            navigate(`/search/${keyword}`);
        }
    };

    return (
        <div className="navbar">
            <h2 className="logo">
                YouTube Clone
            </h2>

            <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={keyword}
                onChange={(e) =>
                    setKeyword(e.target.value)
                }
                onKeyDown={handleSearch}
            />

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/playlists">
                    Playlists
                </Link>
            </div>
        </div>
    );
}

export default Navbar;