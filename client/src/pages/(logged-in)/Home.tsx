import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Songs from "../../components/Songs";
import Player from "../../components/Player";
import { Flex } from "@chakra-ui/react";

interface IUserInfo {
    firstName: string;
    lastName: string;
}

const Home: FC = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo>({ firstName: "", lastName: "" });
    const [selectedSong, setSelectedSong] = useState<{ name: string; image: string; artist: string } | null>(null);
    const [searchText, setSearchText] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const response = await axios.get("http://localhost:6001/", { withCredentials: true });

                setUserInfo(response.data.user);

                navigate("/");
            } catch (error) {
                console.error("Error fetching home:", error);
                navigate("/login");
            }
        };
        fetchHome();
    }, []);

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    return (
        <>
            <Header userInfo={userInfo} onSearchChange={handleSearchChange} />
            <Flex>
                <Sidebar />
                <Songs setSelectedSong={setSelectedSong} searchText={searchText} />
            </Flex>
            {selectedSong && (
                <Player
                    selected={selectedSong}
                    setSelected={setSelectedSong}
                    songImage={selectedSong.image}
                    songName={selectedSong.name}
                    songArtist={selectedSong.artist}
                />
            )}
        </>
    );
};

export default Home;
