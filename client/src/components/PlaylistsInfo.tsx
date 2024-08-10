import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import {
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import Player from "./Player";

interface Song {
    id: string;
    name: string;
    image: string;
    artist?: { name: string };
}

const PlaylistsInfo: FC<any> = () => {
    const { playlistId } = useParams<{ playlistId: string }>();
    const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    const fetchPlaylistSongs = async () => {
        try {
            const response = await api.get(`/songs/playlist/${playlistId}`);
            setPlaylistSongs(response.data);
        } catch (error) {
            console.error("Error fetching playlist songs", error);
        }
    };

    useEffect(() => {
        fetchPlaylistSongs();
    }, [playlistId]);

    const handleSongClick = (song: Song) => {
        setSelectedSong(song);
    };

    const handleDelete = async (songId: string) => {
        try {
            await api.patch(`/songs/delete/${songId}`);
            fetchPlaylistSongs();
        } catch (error) {
            console.error("Error deleting song from playlist", error);
        }
    };

    return (
        <>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>№</Th>
                        <Th>Название</Th>
                        <Th>Исполнитель</Th>
                        <Th>Действия</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {playlistSongs.map((song, index) => (
                        <Tr
                            key={song.id}
                            onClick={() => handleSongClick(song)}
                            style={{ cursor: "pointer" }}
                        >
                            <Td>{index + 1}</Td>
                            <Td>
                                <Image
                                    src={`/assets/img/${song.image}.jpg`}
                                    alt={song.name}
                                    w="50px"
                                />
                                <Text ml="2">{song.name}</Text>
                            </Td>
                            <Td>{song.artist?.name}</Td>
                            <Td>
                                <Menu>
                                    <MenuButton fontSize="32px">...</MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => handleDelete(song.id)}>
                                            Удалить с плейлиста
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {selectedSong && (
                <Player
                    playlist={playlistId}
                    selected={selectedSong}
                    setSelected={setSelectedSong}
                />
            )}
        </>
    );
};

export default PlaylistsInfo;
