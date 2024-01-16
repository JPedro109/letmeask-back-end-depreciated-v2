import { RoomModel } from "@/layers/application";

export type CreateRoomDTO = {
    userId: string;
    roomName: string;
}

export type CreateRoomResponseDTO = RoomModel;