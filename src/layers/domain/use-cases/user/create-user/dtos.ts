import { InvalidUserEmailError, InvalidUserPasswordError } from "@/layers/domain";
import { InvalidParamError } from "@/layers/domain";

export type CreateUserDTO = {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
}

export type CreateUserResponseDTO = string | InvalidUserEmailError | InvalidUserPasswordError | InvalidParamError;