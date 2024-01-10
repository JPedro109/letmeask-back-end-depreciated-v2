import { InvalidUsernameError } from "@/layers/domain";

export type UpdateUsernameDTO = {
    id: string;
    username: string;
}

export type UpdateUsernameResponseDTO = string | InvalidUsernameError;