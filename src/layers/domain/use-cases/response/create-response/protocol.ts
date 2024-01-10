import { CreateResponseDTO, CreateResponseResponseDTO } from "./dtos";

export interface CreateResponseUseCaseProtocol {
    execute({ questionId, response }: CreateResponseDTO): Promise<CreateResponseResponseDTO>;
}