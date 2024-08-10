import axios from "axios";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import Form from "../shared/Form";
import { useNavigate } from "react-router-dom";

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
        lastName: ""
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
            const response = await axios.post("http://localhost:6001/auth/signup", formData);
            setErrors(null);
            navigate("/login")
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
            <Form handleSubmit={handleSubmit} inputNames={["username", "password", "firstName", "lastName"]} handleChange={handleChange} buttonText="Signup" />
        </>
    )
}

export default Signup;
