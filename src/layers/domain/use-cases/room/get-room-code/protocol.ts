import { GetRoomCodeDTO, GetRoomCodeResponseDTO } from "./dtos";

export interface GetRoomCodeUseCaseProtocol {
    execute({ roomCode }: GetRoomCodeDTO): Promise<GetRoomCodeResponseDTO>;
}