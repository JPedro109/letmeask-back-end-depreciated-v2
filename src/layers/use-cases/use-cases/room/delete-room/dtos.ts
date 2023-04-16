import { InvalidRoomCodeError } from "@/layers/entities";
import { NotFoundError, RoomModel, UnauthorizedError } from "@/layers/use-cases";

export type DeleteRoomDTO = {
    roomCode: string;
    userId: string;
}

export type DeleteRoomResponseDTO = RoomModel | InvalidRoomCodeError | NotFoundError | UnauthorizedError; 