import { InvalidRoomCodeError, InvalidRoomNameError } from "@/layers/domain";
import { RoomModel, UnauthorizedError } from "@/layers/domain";

export type CreateRoomDTO = {
    userId: string;
    roomName: string;
}

export type CreateRoomResponseDTO = RoomModel | InvalidRoomCodeError | InvalidRoomNameError | UnauthorizedError;