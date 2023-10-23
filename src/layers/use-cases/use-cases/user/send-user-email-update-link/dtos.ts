import { InvalidUserEmailError } from "@/layers/entities";
import { InvalidParamError, NotFoundError } from "@/layers/use-cases";

export type SendUserEmailUpdateLinkDTO = {
    id: string;
    email: string;
}

export type SendUserEmailUpdateLinkResponseDTO = string | InvalidUserEmailError | NotFoundError | InvalidParamError;