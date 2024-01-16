import { RoomModel } from "@/layers/application";

export type DeleteRoomDTO = {
    roomCode: string;
    userId: string;
}

export type DeleteRoomResponseDTO = RoomModel; 