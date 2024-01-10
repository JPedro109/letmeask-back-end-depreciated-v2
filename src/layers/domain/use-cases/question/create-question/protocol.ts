import { CreateQuestionDTO, CreateQuestionResponseDTO } from "./dtos";

export interface CreateQuestionUseCaseProtocol {
    execute({ userId, roomCode, question }: CreateQuestionDTO): Promise<CreateQuestionResponseDTO>;
}