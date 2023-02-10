import { UnauthorizedError } from "@/layers/use-cases";

export type UserLoginDTO = {
    email: string;
    password: string;
}

export type UserLoginResponseDTO = string | UnauthorizedError;