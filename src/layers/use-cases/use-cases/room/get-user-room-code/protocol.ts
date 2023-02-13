import { GetUserRoomCodeDTO, GetUserRoomCodeResponseDTO } from "./dtos";

export interface GetUserRoomCodeUseCaseProtocol {
    execute({ userId }: GetUserRoomCodeDTO): Promise<GetUserRoomCodeResponseDTO>;
}