import { DeleteUserDTO, DeleteUserResponseDTO } from "./dtos";

export interface DeleteUserUseCaseProtocol {
    execute(dto: DeleteUserDTO): Promise<DeleteUserResponseDTO>;
}