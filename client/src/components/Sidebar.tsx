import { Button, Flex, Image, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import "./Sidebar.css";
import api from "../services/api";

const Sidebar: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [playlistName, setPlaylistName] = useState<any>();
    const [playlists, setPlaylists] = useState<any>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlaylistName({ ...playlistName, [name]: value });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await api.post("/playlists/create", { playlistName, }, { withCredentials: true });
            setPlaylists([...playlists, response.data])
        } catch (error: unknown) {
            console.error("Error adding playlist", error)
        }
    }

    useEffect(() => {
        const findPlaylists = async () => {
            try {
                const response = await api.get("playlists/find", { withCredentials: true });
                setPlaylists(response.data);

            } catch (error: unknown) {
                console.error("Error fetching playlists", error);
            }
        }
        findPlaylists();
    }, []);

    return (
        <aside className="sidebar">
            <Flex flexDirection="column" gap="20px">
                <Link href="/playlists">
                    <Flex alignItems="center" gap="5px">
                        <Image src="/assets/img/playlists-icon.png" />
                        Плейлисты
                    </Flex>
                </Link>
                <Link href="/tracks">
                    <Flex alignItems="center" gap="5px">
                        <Image src="/assets/img/tracks-icon.png" />
                        Треки
                    </Flex>
                </Link>
                <Link href="/favouriteSongs">Любимые песни</Link>
                <Button onClick={onOpen} bg="none">Добавить Плейлист</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Добавить Плейлист</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form onSubmit={handleSubmit}>
                                <Input type="text" name="playlistName" mb="10px" placeholder="Имя Плейлиста" onChange={handleChange} required />
                                <Button colorScheme="green" onClick={onClose} type="submit">Добавить</Button>
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={onClose}>Отмена</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {playlists && playlists.map((playlist: any) => (
                    <div key={playlist.id}>
                        <Link href={`/playlists/${playlist.id}`}>{playlist.name}</Link>
                    </div>
                ))}
            </Flex>
        </aside>
    )
}

export default Sidebar;