import { InvalidEmailError } from "@/layers/entities";
import { InvalidParamError, NotFoundError } from "@/layers/use-cases";

export type SendUserEmailUpdateLinkDTO = {
    id: string;
    email: string;
}

export type SendUserEmailUpdateLinkResponseDTO = string | InvalidEmailError | NotFoundError | InvalidParamError;