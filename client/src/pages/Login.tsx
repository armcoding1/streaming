import axios from "axios";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TextField from "../components/shared/TextField";
import { Button, Container, Flex, Heading, Link } from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";
import api from "../services/api";

interface ILogin {
    username: string;
    password: string;
}

const Login: FC = () => {
    const [formData, setFormData] = useState<ILogin>({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", formData, { withCredentials: true });
            const token = response.data.accessToken;
            Cookies.set("accessToken", token, { expires: 1000 * 60 * 60 * 24 })
            setErrors(null);
            navigate("/")
        } catch (error: any) {
            setErrors(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="background">
            <Container>
                <Flex justifyContent="center" alignItems="center" h="100vh">
                    <form onSubmit={handleSubmit} className="login-form">
                        <Heading as="h2" color="#333" fontWeight="700" mb="30px" textAlign="center">Login</Heading>
                        <Flex flexDirection="column" gap="20px" alignItems="start">
                            <TextField type="text" name="username" onChange={handleChange} placeholder="Username*" />
                            <TextField type="password" name="password" onChange={handleChange} placeholder="Password*" />
                            <Button type="submit" colorScheme="teal">Login</Button>
                            <Link href="/signup" color="blue">Еще нет аккаунта? Зарегистрироваться</Link>
                        </Flex>
                    </form>
                    <Toaster position="top-center" reverseOrder={false} />
                </Flex>
            </Container>
        </div>
    )
}

export default Login;
