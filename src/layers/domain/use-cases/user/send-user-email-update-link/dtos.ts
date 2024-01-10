import { InvalidUserEmailError } from "@/layers/domain";
import { InvalidParamError, NotFoundError } from "@/layers/domain";

export type SendUserEmailUpdateLinkDTO = {
    id: string;
    email: string;
}

export type SendUserEmailUpdateLinkResponseDTO = string | InvalidUserEmailError | NotFoundError | InvalidParamError;