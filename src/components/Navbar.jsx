import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function Navbar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    const handleSearch = (e) => {
        if (e.key === "Enter" && keyword.trim()) {
            navigate(`/search/${keyword}`);
        }
    };


    const toggleTheme = () => {
        const newTheme = !darkMode;

        setDarkMode(newTheme);

        localStorage.setItem(
            "theme",
            newTheme ? "dark" : "light"
        );
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };
    return (
        <div className="navbar-center">
            <h2 className="logo">
                YouTube Clone
            </h2>

            <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearch}
            />

            <div className="nav-links">
                <Link to="/">All</Link>

                <Link to="/playlists">Playlists</Link>
                <Link to="/create-channel">Create Channel</Link>
                <Link to="/upload">Upload</Link>
                <Link to="/history">History</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/trending">Trending</Link>
                <button className="theme-btn"
                    onClick={toggleTheme}
                    style={{
                        cursor: "pointer",
                        padding: "5px 10px",
                    }}
                >
                    {darkMode
                        ? "☀️ Light"
                        : "🌙 Dark"}
                </button>
                {user ? (
                    <>
                        <span>👤 {user.username}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;