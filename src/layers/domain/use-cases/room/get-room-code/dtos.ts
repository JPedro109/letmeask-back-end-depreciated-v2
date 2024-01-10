import { NotFoundError } from "@/layers/domain";

export type GetRoomCodeDTO = {
    roomCode: string;
}

export type GetRoomCodeResponseDTO = boolean | NotFoundError;