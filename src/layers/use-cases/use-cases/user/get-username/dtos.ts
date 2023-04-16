import { NotFoundError } from "@/layers/use-cases";

export type GetUsernameDTO = {
    id: string;
}

export type GetUsernameResponseDTO = string | NotFoundError;