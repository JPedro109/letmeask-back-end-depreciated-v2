import { Question } from "@/layers/entities";
import { 
	NotFoundError, 
	QuestionRepositoryProtocol, 
	RoomRepositoryProtocol, 
	UnauthorizedError,
	UserRepositoryProtocol, 
	CacheProtocol, 
	RoomModel 
} from "@/layers/use-cases";
import { CreateQuestionUseCaseProtocol } from "./protocol";
import { CreateQuestionDTO, CreateQuestionResponseDTO } from "./dtos";

export class CreateQuestionUseCase implements CreateQuestionUseCaseProtocol {

	constructor(
        private readonly questionRepository: QuestionRepositoryProtocol,
        private readonly roomRepository: RoomRepositoryProtocol,
        private readonly userRepository: UserRepositoryProtocol,
		private readonly _cache: CacheProtocol
	) { }

	private async addCache(roomCode: string) {
		this._cache.del(`room-${roomCode}`);
		const room = await this.roomRepository.getRoomByCode(roomCode);
		this._cache.set<RoomModel>(`room-${roomCode}`, room, 3600);
	}

	async execute({ userId, roomCode, question }: CreateQuestionDTO): Promise<CreateQuestionResponseDTO> {
		const questionOrError = Question.create(question);

		if(questionOrError instanceof Error) return questionOrError;

		if(!(await this.roomRepository.roomExists(roomCode))) 
			return new NotFoundError("A sala em que você quer criar a sua pergunta não existe");

		const user = await this.userRepository.getUserById(userId);

		if(user.managedRoom === roomCode) 
			return new UnauthorizedError("O administrador da sala não pode criar perguntas em sua própria sala");

		const createdQuestion = await this.questionRepository.store(roomCode, question, userId);

		await this.addCache(roomCode);
		
		return createdQuestion;
	}
}