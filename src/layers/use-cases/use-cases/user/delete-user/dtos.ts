import { InvalidParamError, NotFoundError } from "@/layers/use-cases";

export type DeleteUserDTO = {
    id: string;
    password: string;
    passwordConfirm: string;
}

export type DeleteUserResponseDTO = string | InvalidParamError | NotFoundError;