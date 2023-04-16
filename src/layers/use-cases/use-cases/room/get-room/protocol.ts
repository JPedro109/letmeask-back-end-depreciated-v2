import { GetRoomDTO, GetRoomResponseDTO } from "./dtos";

export interface GetRoomUseCaseProtocol {
    execute({ roomCode }: GetRoomDTO): Promise<GetRoomResponseDTO>;
}