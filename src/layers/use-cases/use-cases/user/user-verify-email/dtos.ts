import { InvalidParamError, NotFoundError } from "@/layers/use-cases";

export type UserVerifyEmailDTO = {
    email: string;
    code: string;
};

export type UserVerifyEmailResponseDTO = string | NotFoundError | InvalidParamError;