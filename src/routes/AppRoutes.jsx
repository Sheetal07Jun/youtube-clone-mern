import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Video from "../pages/Video";
import Channel from "../pages/Channel";
import Playlist from "../pages/Playlist";
import Search from "../pages/Search";
import CreateVideo from "../pages/CreateVideo";
import CreateChannel from "../pages/CreateChannel";
import History from "../pages/History";
import Profile from "../pages/Profile";
import Trending from "../pages/Trending";
import Subscriptions from "../pages/Subscriptions";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/video/:id"
                element={<Video />}
            />

            <Route
                path="/channel/:id"
                element={<Channel />}
            />

            <Route
                path="/playlists"
                element={<Playlist />}
            />

            <Route
                path="/search/:keyword"
                element={<Search />}
            />
            <Route
                path="/upload"
                element={<CreateVideo />}
            />
            <Route
                path="/create-channel"
                element={<CreateChannel />}
            />
            <Route
                path="/history"
                element={<History />}
            />
            <Route
                path="/profile"
                element={<Profile />}
            />
            <Route
                path="/trending"
                element={<Trending />}
            />
            <Route
                path="/subscriptions"
                element={<Subscriptions />}
            />
        </Routes>

    );
}

export default AppRoutes;