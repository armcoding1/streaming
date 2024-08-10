import React, { FC } from "react";
import { Box, Flex, Icon, Image, Input, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import "./Header.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface IUserInfo {
    firstName: string;
    lastName: string;
}

interface HeaderProps {
    userInfo: IUserInfo;
    onSearchChange: (searchText: string) => void;
}

const Header: FC<HeaderProps> = ({ userInfo, onSearchChange }) => {
    const navigate = useNavigate();
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        onSearchChange(text);
    };

    const handleLogout = async () => {
        const response = await api.get("/auth/logout", { withCredentials: true });
        navigate("/login");
    }

    return (
        <header className="header">
            <Flex alignItems="center" justifyContent="space-between">
                <Image src="/assets/img/logo.png" w="143px" />
                <Flex alignItems="center" position="relative">
                    <Input
                        type="search"
                        placeholder="ЧТО БУДЕМ ИСКАТЬ?"
                        pl="4.5rem"
                        variant="filled"
                        w="50vw"
                        borderRadius="30px"
                        name="search"
                        onChange={handleSearchInputChange}
                    />
                    <Icon
                        as={SearchIcon}
                        color="gray.500"
                        w={6}
                        h={6}
                        position="absolute"
                        left="1rem"
                    />
                </Flex>
                <Box bg="#F5F5F5" borderRadius="30px" p="18px">
                    <Flex gap="20px" alignItems="center">
                        <Text as="span">
                            {userInfo && userInfo.firstName}&nbsp;
                            {userInfo.lastName}
                        </Text>
                        <Image src="/assets/img/profile-logout-icon.png" onClick={handleLogout}/>
                    </Flex>
                </Box>
            </Flex>
        </header>
    );
};

export default Header;
