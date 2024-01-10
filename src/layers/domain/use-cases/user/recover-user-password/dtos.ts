import { InvalidUserPasswordError } from "@/layers/domain";
import { InvalidParamError, NotFoundError } from "@/layers/domain";

export type RecoverUserPasswordDTO = {
    email: string;
    code: string;
    password: string;
    passwordConfirm: string;
}

export type RecoverUserPasswordResponseDTO = string | InvalidUserPasswordError | InvalidParamError | NotFoundError;