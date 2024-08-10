import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { IPlaylist } from "../../typings/Playlists.type";

interface ModalProps {
    playlists: IPlaylist[]; 
    isOpen: boolean;
    onClose: () => void;
}

const ModalComponent: FC<ModalProps> = ({ playlists, isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Выберите плейлист</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {playlists.map((playlist: any) => (
                        <Flex key={playlist.id} flexDirection="column">
                            {playlist.name}
                        </Flex>
                    ))}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button variant='ghost'>Дополнительное действие</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalComponent;
