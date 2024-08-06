import { GetRoomDTO, GetRoomResponseDTO } from "./dtos";

export interface GetRoomUseCaseProtocol {
    execute(dto: GetRoomDTO): Promise<GetRoomResponseDTO>;
}