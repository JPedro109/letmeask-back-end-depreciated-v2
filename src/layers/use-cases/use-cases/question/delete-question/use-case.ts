import { 
	NotFoundError, 
	QuestionRepositoryProtocol,
	RoomRepositoryProtocol,
	UnauthorizedError,
	CacheProtocol,
	RoomModel
} from "@/layers/use-cases";
import { DeleteQuestionDTO, DeleteQuestionResponseDTO } from "./dtos";
import { DeleteQuestionUseCaseProtocol } from "./protocol";

export class DeleteQuestionUseCase implements DeleteQuestionUseCaseProtocol {

	constructor(
        private readonly questionRepository: QuestionRepositoryProtocol, 
        private readonly roomRepository: RoomRepositoryProtocol,
		private readonly cache: CacheProtocol
	) { }

	private async addCache(roomCode: string) {
		this.cache.del(`room-${roomCode}`);
		const room = await this.roomRepository.getRoomByCode(roomCode);
		this.cache.set<RoomModel>(`room-${roomCode}`, room, 3600);
	}

	async execute({ userId, questionId }: DeleteQuestionDTO): Promise<DeleteQuestionResponseDTO> { 
		const question = await this.questionRepository.getById(questionId);

		if(!question) return new NotFoundError("Essa pergunta não existe");

		if(userId === question.userId) {
			const question = await this.questionRepository.deleteQuestionById(questionId);
			await this.addCache(question.roomCode);
			return question;
		}

		const roomCode = await this.roomRepository.getCodeByUserId(userId);

		if(roomCode === question.roomCode) {
			const question = await this.questionRepository.deleteQuestionById(questionId);
			await this.addCache(question.roomCode);
			return question;
		}

		return new UnauthorizedError("Só o administrador da sala ou o criador da pergunta podem apagar ela");
	}
}