import { DeleteUserDTO, DeleteUserResponseDTO } from "./dtos";

export interface DeleteUserUseCaseProtocol {
    execute({ id, password, passwordConfirm }: DeleteUserDTO): Promise<DeleteUserResponseDTO>;
}