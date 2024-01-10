import { InvalidParamError, NotFoundError } from "@/layers/domain";

export type UserVerifyEmailDTO = {
    email: string;
    code: string;
};

export type UserVerifyEmailResponseDTO = string | NotFoundError | InvalidParamError;