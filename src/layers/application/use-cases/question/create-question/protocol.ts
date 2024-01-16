import { CreateQuestionDTO, CreateQuestionResponseDTO } from "./dtos";

export interface CreateQuestionUseCaseProtocol {
    execute(dto: CreateQuestionDTO): Promise<CreateQuestionResponseDTO>;
}