import { InvalidParamError, NotFoundError } from "@/layers/use-cases";

export type UpdateUserEmailDTO = {
    id: string;
    email: string;
    code: string;
}

export type UpdateUserEmailResponseDTO = string | NotFoundError | InvalidParamError;