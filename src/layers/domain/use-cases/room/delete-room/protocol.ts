import { DeleteRoomDTO, DeleteRoomResponseDTO } from "./dtos";

export interface DeleteRoomUseCaseProtocol {
    execute({ roomCode, userId }: DeleteRoomDTO): Promise<DeleteRoomResponseDTO>;
}