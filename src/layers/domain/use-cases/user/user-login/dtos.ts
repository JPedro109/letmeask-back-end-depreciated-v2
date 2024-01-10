import { UnauthorizedError } from "@/layers/domain";

export type UserLoginDTO = {
    email: string;
    password: string;
}

export type UserLoginResponseDTO = string | UnauthorizedError;