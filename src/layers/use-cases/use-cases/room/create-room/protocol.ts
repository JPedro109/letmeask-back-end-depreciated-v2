import { CreateRoomDTO, CreateRoomResponseDTO } from "./dtos";

export interface CreateRoomUseCaseProtocol {
    execute({ userId, roomName }: CreateRoomDTO): Promise<CreateRoomResponseDTO>;
}