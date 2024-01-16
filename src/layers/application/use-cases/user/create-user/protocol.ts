import { CreateUserDTO, CreateUserResponseDTO } from "./dtos";

export interface CreateUserUseCaseProtocol {
    execute(dto: CreateUserDTO): Promise<CreateUserResponseDTO>
}