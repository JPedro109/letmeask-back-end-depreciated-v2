import { NotFoundError } from "@/layers/use-cases";

export type GetRoomCodeDTO = {
    roomCode: string;
}

export type GetRoomCodeResponseDTO = boolean | NotFoundError;