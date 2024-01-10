import { DeleteQuestionDTO, DeleteQuestionResponseDTO } from "./dtos";

export interface DeleteQuestionUseCaseProtocol {
    execute({ userId, questionId }: DeleteQuestionDTO): Promise<DeleteQuestionResponseDTO>;
}