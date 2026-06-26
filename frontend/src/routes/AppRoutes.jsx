import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Video from "../pages/Video";
import Channel from "../pages/Channel";
import Playlist from "../pages/Playlist";
import Search from "../pages/Search";

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
        </Routes>
    );
}

export default AppRoutes;