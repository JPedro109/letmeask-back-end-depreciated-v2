import { NotFoundError } from "@/layers/domain";

export type GetUsernameDTO = {
    id: string;
}

export type GetUsernameResponseDTO = string | NotFoundError;