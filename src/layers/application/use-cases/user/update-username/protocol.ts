import { UpdateUsernameDTO, UpdateUsernameResponseDTO } from "./dtos";

export interface UpdateUsernameUseCaseProtocol {
    execute(dto: UpdateUsernameDTO): Promise<UpdateUsernameResponseDTO>;
}