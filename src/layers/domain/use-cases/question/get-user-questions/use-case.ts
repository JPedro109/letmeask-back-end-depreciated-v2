import { QuestionRepositoryProtocol } from "@/layers/domain";
import { GetUserQuestionsUseCaseProtocol } from "./protocol";
import { GetUserQuestionsDTO, GetUserQuestionsResponseDTO } from "./dtos";

export class GetUserQuestionsUseCase implements GetUserQuestionsUseCaseProtocol {

	constructor(private readonly repository: QuestionRepositoryProtocol) { }

	async execute({ userId }: GetUserQuestionsDTO): Promise<GetUserQuestionsResponseDTO> {
		return this.repository.getRoomByUserId(userId);
	}
}