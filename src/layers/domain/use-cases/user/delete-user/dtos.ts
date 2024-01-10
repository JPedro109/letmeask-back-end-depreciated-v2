import { InvalidParamError, NotFoundError } from "@/layers/domain";

export type DeleteUserDTO = {
    id: string;
    password: string;
    passwordConfirm: string;
}

export type DeleteUserResponseDTO = string | InvalidParamError | NotFoundError;