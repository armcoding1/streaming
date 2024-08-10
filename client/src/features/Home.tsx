import axios from "axios";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const response = await axios.get("http://localhost:6001/", { withCredentials: true });
                console.log("Response:", response);
                navigate("/");
            } catch (error) {
                console.error("Error fetching home:", error);
                navigate("/login");
            }
        };
        fetchHome();
    }, []);

    return (
        <h1>Working</h1>
    );
};

export default Home;
