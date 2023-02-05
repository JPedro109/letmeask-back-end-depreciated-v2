import { InvalidEmailError, InvalidPasswordError } from "@/layers/entities";
import { InvalidParamError } from "@/layers/use-cases";

export type CreateUserDTO = {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
}

export type CreateUserResponseDTO = string | InvalidEmailError | InvalidPasswordError | InvalidParamError;