import { InvalidRoomCodeError } from "@/layers/domain";
import { NotFoundError, RoomModel } from "@/layers/domain";

export type GetRoomDTO = {
    roomCode: string;
}

export type GetRoomResponseDTO = RoomModel | InvalidRoomCodeError | NotFoundError; 