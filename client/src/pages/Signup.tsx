import React, { FC, FormEvent, useState } from "react";
import { Button, Container, Flex, Heading, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TextField from "../components/shared/TextField";
import "./Signup.css";
import { Toaster } from "react-hot-toast";
import api from "../services/api";

interface ISignup {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

const Signup: FC = () => {
    const [formData, setFormData] = useState<ISignup>({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [errors, setErrors] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await api.post("auth/signup", formData);
            setErrors(null);
            navigate("/login");
        } catch (error: any) {
            setErrors(error.response.data.message);
            toast.error(`${error.response.data.message}`);
        }
    };

    return (
        <div className="background">
            <Container>
                <Flex justifyContent="center" alignItems="center" h="100vh">
                    <form onSubmit={handleSubmit} className="signup-form">
                        <Heading
                            as="h2"
                            color="#333"
                            fontWeight="700"
                            mb="30px"
                            textAlign="center"
                        >
                            Sign up
                        </Heading>
                        <Flex flexDirection="column" gap="20px" alignItems="start">
                            <TextField
                                type="text"
                                name="username"
                                onChange={handleChange}
                                placeholder="Username*"
                            />
                            <TextField
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Password*"
                            />
                            <TextField
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                placeholder="First Name*"
                            />
                            <TextField
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                placeholder="Last Name*"
                            />
                            <Button type="submit" colorScheme="teal">
                                Signup
                            </Button>
                            <Link href="/login" color="blue">Уже есть аккаунт? Войти</Link>
                        </Flex>
                    </form>
                    <Toaster position="top-center" reverseOrder={false} />
                </Flex>
            </Container>
        </div>
    );
};

export default Signup;
