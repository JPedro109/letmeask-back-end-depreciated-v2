import { CreateRoomDTO, CreateRoomResponseDTO } from "./dtos";

export interface CreateRoomUseCaseProtocol {
    execute(dto: CreateRoomDTO): Promise<CreateRoomResponseDTO>;
}