import { InvalidUserEmailError, InvalidUserPasswordError } from "@/layers/entities";
import { InvalidParamError } from "@/layers/use-cases";

export type CreateUserDTO = {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
}

export type CreateUserResponseDTO = string | InvalidUserEmailError | InvalidUserPasswordError | InvalidParamError;