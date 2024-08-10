import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Image, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Player from "./Player";

interface Song {
    id: string;
    name: string;
    image: string;
    artist?: { name: string };
}

const FavouriteInfo: FC<any> = () => {
    const { playlistId } = useParams<{ playlistId: string }>();
    const [favouriteSongs, setFavouriteSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    const fetchFavouriteSongs = async () => {
        try {
            const response = await api.get("/songs/favouriteSongs");
            setFavouriteSongs(response.data);
        } catch (error) {
            console.error("Error fetching favourite songs", error);
        }
    };
    useEffect(() => {
        fetchFavouriteSongs();
    }, [playlistId]);

    const handleSongClick = (song: Song) => {
        setSelectedSong(song);
    };

    return (
        <>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>№</Th>
                        <Th>Название</Th>
                        <Th>Исполнитель</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {favouriteSongs.map((song, index) => (
                        <Tr key={song.id} onClick={() => handleSongClick(song)} style={{ cursor: "pointer" }}>
                            <Td>{index + 1}</Td>
                            <Td>
                                <Image src={`/assets/img/${song.image}.jpg`} alt={song.name} w="50px" />
                                <Text ml="2">{song.name}</Text>
                            </Td>
                            <Td>{song.artist?.name}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {selectedSong && (
                <Player
                    selected={selectedSong}
                    setSelected={setSelectedSong}
                />
            )}
        </>
    );
};

export default FavouriteInfo;