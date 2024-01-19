import { RoomModel } from "./model";

export interface RoomRepositoryProtocol {
    setContext(context: unknown): void;
    createRoom(roomCode: string, roomName: string, userId: string): Promise<RoomModel>;
    getRoomByRoomCode(roomCode: string): Promise<RoomModel | null>;
    getRoomByUserId(userId: string): Promise<RoomModel | null>;
    getRoomCodeByUserId(userId: string): Promise<string | null>;
    roomExists(roomCode: string): Promise<boolean>;
    deleteRoomByCode(roomCode: string): Promise<RoomModel>;
}