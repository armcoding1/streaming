import { Input } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";

interface ITextField {
    type: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const TextField: FC<ITextField> = ({ type, name, onChange, placeholder }) => {
    return (
        <Input
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    )
}

export default TextField;