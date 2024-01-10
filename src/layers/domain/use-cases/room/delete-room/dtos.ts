import { InvalidRoomCodeError } from "@/layers/domain";
import { NotFoundError, RoomModel, UnauthorizedError } from "@/layers/domain";

export type DeleteRoomDTO = {
    roomCode: string;
    userId: string;
}

export type DeleteRoomResponseDTO = RoomModel | InvalidRoomCodeError | NotFoundError | UnauthorizedError; 