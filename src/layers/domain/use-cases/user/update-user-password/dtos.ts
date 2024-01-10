import { InvalidUserPasswordError } from "@/layers/domain";
import { InvalidParamError, NotFoundError } from "@/layers/domain";

export type UpdateUserPasswordDTO = {
    id: string;
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export type UpdateUserPasswordResponseDTO = string | InvalidUserPasswordError | InvalidParamError | NotFoundError;