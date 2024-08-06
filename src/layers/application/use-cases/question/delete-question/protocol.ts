import { DeleteQuestionDTO, DeleteQuestionResponseDTO } from "./dtos";

export interface DeleteQuestionUseCaseProtocol {
    execute(dto: DeleteQuestionDTO): Promise<DeleteQuestionResponseDTO>;
}