import { RoomModel } from "@/layers/application";

export type GetRoomDTO = {
    roomCode: string;
}

export type GetRoomResponseDTO = RoomModel; 