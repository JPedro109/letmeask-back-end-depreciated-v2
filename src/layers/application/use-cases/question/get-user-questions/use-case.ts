import { QuestionRepositoryProtocol } from "@/layers/application";
import { GetUserQuestionsUseCaseProtocol } from "./protocol";
import { GetUserQuestionsDTO, GetUserQuestionsResponseDTO } from "./dtos";

export class GetUserQuestionsUseCase implements GetUserQuestionsUseCaseProtocol {

	constructor(private readonly repository: QuestionRepositoryProtocol) { }

	async execute({ userId }: GetUserQuestionsDTO): Promise<GetUserQuestionsResponseDTO> {
		return this.repository.getQuestionsByUserId(userId);
	}
}