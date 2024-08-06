import { GetUserQuestionsDTO, GetUserQuestionsResponseDTO } from "./dtos";

export interface GetUserQuestionsUseCaseProtocol {
    execute(dto: GetUserQuestionsDTO): Promise<GetUserQuestionsResponseDTO>;
}