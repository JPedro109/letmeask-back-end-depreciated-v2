import { CreateResponseDTO, CreateResponseResponseDTO } from "./dtos";

export interface CreateResponseUseCaseProtocol {
    execute(dto: CreateResponseDTO): Promise<CreateResponseResponseDTO>;
}