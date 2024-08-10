import { FC, useEffect, useState } from "react";
import api from "../services/api";
import { IPlaylist } from "../typings/Playlists.type";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Playlists: FC = () => {
    const [playlists, setPlaylists] = useState<IPlaylist[]>();
    const navigate = useNavigate();

    useEffect(() => {
        const findPlaylists = async () => {
            const response = await api.get("/playlists/find", { withCredentials: true });
            setPlaylists(response.data);
        };
        findPlaylists();
    }, []);

    const handleClick = async (e: any) => {
        const playlistId = e.target.dataset.id;
        
        navigate(`/playlists/${playlistId}`)
    };

    return (
        <>
            {playlists && playlists.map((playlist: IPlaylist) => (
                <Heading as="h3" data-id={playlist.id} onClick={handleClick} cursor="pointer">{playlist.name}</Heading>
            ))}
        </>
    )
}

export default Playlists;