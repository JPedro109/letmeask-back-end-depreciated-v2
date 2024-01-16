import { GetRoomCodeDTO, GetRoomCodeResponseDTO } from "./dtos";

export interface GetRoomCodeUseCaseProtocol {
    execute(dto: GetRoomCodeDTO): Promise<GetRoomCodeResponseDTO>;
}