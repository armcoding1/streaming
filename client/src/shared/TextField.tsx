import { Input } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";

interface ITextField {
    type: string;
    name: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextField: FC<ITextField> = ({ type, name, handleChange }) => {
    return (
        <Input type={type} name={name} onChange={handleChange} required/>
    )
}

export default TextField;