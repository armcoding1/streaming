import axios from "axios";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import Form from "../shared/Form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
            const response = await axios.post("http://localhost:6001/auth/login", formData, { withCredentials: true });
            const token = response.data.accessToken;
            Cookies.set("accessToken", token, { expires: 1000 * 60 * 60 * 24 })
            setErrors(null);
            navigate("/")
        } catch (error: any) {
            if (error.response) {
                console.error("Error response:", error.response.data);
                setErrors(error.response.data.message);
            } else if (error.request) {
                console.error("No response received:", error.request);
                setErrors("No response received from server");
            } else {
                console.error("Error:", error.message);
                setErrors("An error occurred");
            }
        }
    }

    return (
        <>
            {errors && <div className="error-message">{errors}</div>}
            <Form handleSubmit={handleSubmit} inputNames={["username", "password"]} handleChange={handleChange} buttonText="Login" />
        </>
    )
}

export default Login;
