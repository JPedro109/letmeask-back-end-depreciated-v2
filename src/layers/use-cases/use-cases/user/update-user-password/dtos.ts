import { InvalidUserPasswordError } from "@/layers/entities";
import { InvalidParamError, NotFoundError } from "@/layers/use-cases";

export type UpdateUserPasswordDTO = {
    id: string;
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export type UpdateUserPasswordResponseDTO = string | InvalidUserPasswordError | InvalidParamError | NotFoundError;