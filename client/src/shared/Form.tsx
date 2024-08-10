import { Button, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent } from "react";

interface IForm {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    inputNames: Array<string>;
    buttonText: string;
}

const Form: FC<IForm> = ({ handleSubmit, inputNames, handleChange, buttonText }) => {
    return (
        <form onSubmit={handleSubmit}>
            {inputNames.map((input) => (
                    <Input key={input} type="text" name={input} placeholder={input.toUpperCase()} onChange={handleChange} required />
            ))}
            <Button colorScheme="teal" type="submit">{buttonText}</Button>
        </form>
    )
}

export default Form;