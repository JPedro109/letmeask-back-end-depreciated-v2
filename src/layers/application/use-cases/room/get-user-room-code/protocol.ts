import { GetUserRoomCodeDTO, GetUserRoomCodeResponseDTO } from "./dtos";

export interface GetUserRoomCodeUseCaseProtocol {
    execute(dto: GetUserRoomCodeDTO): Promise<GetUserRoomCodeResponseDTO>;
}