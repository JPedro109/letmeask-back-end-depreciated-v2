import { InvalidUserPasswordError } from "@/layers/entities";
import { InvalidParamError, NotFoundError } from "@/layers/use-cases";

export type RecoverUserPasswordDTO = {
    email: string;
    code: string;
    password: string;
    passwordConfirm: string;
}

export type RecoverUserPasswordResponseDTO = string | InvalidUserPasswordError | InvalidParamError | NotFoundError;