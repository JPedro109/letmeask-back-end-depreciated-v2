import { InvalidUsernameError } from "@/layers/entities";

export type UpdateUsernameDTO = {
    id: string;
    username: string;
}

export type UpdateUsernameResponseDTO = string | InvalidUsernameError;