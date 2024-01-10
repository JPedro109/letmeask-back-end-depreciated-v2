import { NotFoundError } from "@/layers/domain";

export type SendUserPasswordRecoveryLinkDTO = {
    email: string;
}

export type SendUserPasswordRecoveryLinkResponseDTO = string | NotFoundError;