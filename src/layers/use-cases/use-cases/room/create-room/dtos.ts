import { InvalidRoomCodeError, InvalidRoomNameError } from "@/layers/entities";
import { RoomModel, UnauthorizedError } from "@/layers/use-cases";

export type CreateRoomDTO = {
    userId: string;
    roomName: string;
}

export type CreateRoomResponseDTO = RoomModel | InvalidRoomCodeError | InvalidRoomNameError | UnauthorizedError;