import { UpdateUserPasswordDTO, UpdateUserPasswordResponseDTO } from "./dtos";

export interface UpdateUserPasswordUseCaseProtocol {
    execute(dto: UpdateUserPasswordDTO): Promise<UpdateUserPasswordResponseDTO>
}