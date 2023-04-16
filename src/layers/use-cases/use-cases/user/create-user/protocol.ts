import { CreateUserDTO, CreateUserResponseDTO } from "./dtos";

export interface CreateUserUseCaseProtocol {
    execute({ email, password, passwordConfirm }: CreateUserDTO): Promise<CreateUserResponseDTO>
}