import { DeleteRoomDTO, DeleteRoomResponseDTO } from "./dtos";

export interface DeleteRoomUseCaseProtocol {
    execute(dto: DeleteRoomDTO): Promise<DeleteRoomResponseDTO>;
}