import { GetUserQuestionsDTO, GetUserQuestionsResponseDTO } from "./dtos";

export interface GetUserQuestionsUseCaseProtocol {
    execute({ userId }: GetUserQuestionsDTO): Promise<GetUserQuestionsResponseDTO>;
}