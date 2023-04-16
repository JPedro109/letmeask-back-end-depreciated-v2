import { NotFoundError } from "@/layers/use-cases";

export type SendUserPasswordRecoveryLinkDTO = {
    email: string;
}

export type SendUserPasswordRecoveryLinkResponseDTO = string | NotFoundError;