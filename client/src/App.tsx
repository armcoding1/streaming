import { ChakraProvider } from "@chakra-ui/react";
import { FC } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/(logged-in)/Home";
import Signup from "./pages/Signup";
import PlaylistsInfo from "./components/PlaylistsInfo";
import Playlists from "./components/Playlists";
import FavouriteInfo from "./components/FavouritesInfo.tsx";

const App: FC = () => {
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/tracks" element={<Home />} />
                    <Route path="/playlists/:playlistId" element={<PlaylistsInfo />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/favouriteSongs" element={<FavouriteInfo />} />
                </Routes>
            </Router>
        </ChakraProvider>
    )
}

export default App;