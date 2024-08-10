import React, { FC, useEffect, useState } from "react";
import api from "../services/api";
import {
    Button,
    Flex,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    Input,
} from "@chakra-ui/react";
import _ from "lodash";
import { ISetSelectedSong, Song } from "../typings/Songs.type";
import { IPlaylist } from "../typings/Playlists.type";
import { fetchSongs } from "../services/songsService";
import { findPlaylists } from "../services/playlistsService";

const Songs: FC<ISetSelectedSong> = ({ setSelectedSong, searchText }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [playlists, setPlaylists] = useState<IPlaylist[]>();
    const [songId, setSongId] = useState<number>();
    console.log(searchText);

    useEffect(() => {
        fetchSongs(setSongs);
    }, []);

    const likeSong = async (songId: number) => {
        try {
            const response = await api.patch("/songs/like", { songId });
            setSongs((prevSongs) =>
                prevSongs.map((song) =>
                    song.id === songId ? { ...song, liked: response.data.liked } : song
                )
            );
        } catch (error) {
            console.error("Error liking song:", error);
        }
    };

    useEffect(() => {
        findPlaylists(setPlaylists);
    }, []);

    const handleClick = async (e: any) => {
        const playlistId = e.target.dataset.id;
        try {
            const response = await api.patch(`/songs/update/${playlistId}`, { songId });
            onClose();
        } catch (error) {
            console.error("Error adding song to the playlist", error);
        }
    };

    const openModal = (id: number) => {
        setSongId(id);
        onOpen();
    };

    const filteredSongs = searchText
        ? songs.filter((song) =>
            song.name.toLowerCase().includes(searchText.toLowerCase())
        )
        : songs;

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>№</Th>
                    <Th>НАЗВАНИЕ</Th>
                    <Th>АЛЬБОМ</Th>
                    <Th>
                        <Image src="/assets/img/date-icon.png" />
                    </Th>
                    <Th>
                        <Image src="/assets/img/clock-icon.png" />
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {filteredSongs.map((song: Song, index: number) => {
                    const createdAt = new Date(song.createdAt);
                    const now = new Date();
                    const diffMs = now.getTime() - createdAt.getTime();
                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    const diffHrs = Math.floor(
                        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                    const customDate =
                        diffDays > 0
                            ? `${diffDays} Дней назад`
                            : diffHrs > 0
                                ? `${diffHrs} часов назад`
                                : diffMins > 0
                                    ? `${diffMins} минут назад`
                                    : "Только что";

                    const durationSeconds = Math.floor((song.duration / 1000) % 60);
                    const durationMinutes = Math.floor(
                        (song.duration / (1000 * 60)) % 60
                    );

                    return (
                        <Tr key={song.id}>
                            <Td>{index + 1}</Td>
                            <Td
                                onClick={() =>
                                    setSelectedSong({
                                        name: song.name,
                                        image: song.image,
                                        artist: song.artist.name,
                                    })
                                }
                                cursor="pointer"
                            >
                                <Flex alignItems="center" gap="10px">
                                    <Image
                                        src={`/assets/img/${song.image}.jpg`}
                                        w="50px"
                                    />
                                    <Flex flexDirection="column">
                                        <Text as="span">{song.name}</Text>
                                        <Text as="span">{song.artist.name}</Text>
                                    </Flex>
                                </Flex>
                            </Td>
                            <Td>{song.album.name === "=" ? "Нет альбома" : song.album.name}</Td>
                            <Td>{customDate}</Td>
                            <Td>
                                <Flex alignItems="start" gap="5px">
                                    <Image
                                        src={song.liked ? "/assets/img/like.svg" : "/assets/img/unlike.svg"}
                                        onClick={() => likeSong(song.id)}
                                        cursor="pointer"
                                    />
                                    {`${durationMinutes}:${durationSeconds < 10 ? "0" + durationSeconds : durationSeconds}`}
                                    <Menu>
                                        <MenuButton fontSize="32px">...</MenuButton>
                                        <MenuList>
                                            <MenuItem
                                                data-song={song.id}
                                                onClick={() => openModal(song.id)}
                                            >
                                                Добавить в плейлист
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Modal Title</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                {playlists &&
                                                    playlists.map((playlist: IPlaylist) => (
                                                        <Flex
                                                            flexDirection="column"
                                                            key={playlist.id}
                                                        >
                                                            <Text
                                                                as="span"
                                                                data-id={playlist.id}
                                                                cursor="pointer"
                                                                onClick={handleClick}
                                                            >
                                                                {playlist.name}
                                                            </Text>
                                                        </Flex>
                                                    ))}
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button colorScheme="blue" mr={3} onClick={onClose}>
                                                    Close
                                                </Button>
                                                <Button variant="ghost">
                                                    Secondary Action
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Flex>
                            </Td>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};

export default Songs;
