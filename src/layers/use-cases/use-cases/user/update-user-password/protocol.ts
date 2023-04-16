import { UpdateUserPasswordDTO, UpdateUserPasswordResponseDTO } from "./dtos";

export interface UpdateUserPasswordUseCaseProtocol {
    execute({ id, password, newPassword, newPasswordConfirm }: UpdateUserPasswordDTO): Promise<UpdateUserPasswordResponseDTO>
}