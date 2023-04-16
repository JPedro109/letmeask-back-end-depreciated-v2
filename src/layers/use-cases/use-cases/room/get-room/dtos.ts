import { InvalidRoomCodeError } from "@/layers/entities";
import { NotFoundError, RoomModel } from "@/layers/use-cases";

export type GetRoomDTO = {
    roomCode: string;
}

export type GetRoomResponseDTO = RoomModel | InvalidRoomCodeError | NotFoundError; 