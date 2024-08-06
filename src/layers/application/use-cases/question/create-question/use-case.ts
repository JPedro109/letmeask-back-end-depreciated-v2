import { QuestionEntity } from "@/layers/domain";
import { 
	NotFoundError, 
	QuestionRepositoryProtocol, 
	RoomRepositoryProtocol, 
	UnauthorizedError,
	CacheProtocol, 
	RoomModel 
} from "@/layers/application";
import { CreateQuestionUseCaseProtocol } from "./protocol";
import { CreateQuestionDTO, CreateQuestionResponseDTO } from "./dtos";

export class CreateQuestionUseCase implements CreateQuestionUseCaseProtocol {

	constructor(
        private readonly questionRepository: QuestionRepositoryProtocol,
        private readonly roomRepository: RoomRepositoryProtocol,
		private readonly cache: CacheProtocol
	) { }

	private async addCache(roomCode: string) {
		this.cache.del(`room-${roomCode}`);
		const room = await this.roomRepository.getRoomByRoomCode(roomCode);
		this.cache.set<RoomModel>(`room-${roomCode}`, room, 3600);
	}

	async execute({ userId, roomCode, question }: CreateQuestionDTO): Promise<CreateQuestionResponseDTO> {
		const questionEntity = QuestionEntity.create({
			questionDescription: question
		});

		if(!(await this.roomRepository.roomExists(roomCode))) 
			throw new NotFoundError("A sala em que você quer criar a sua pergunta não existe");

		const databaseRoomCode = await this.roomRepository.getRoomCodeByUserId(userId);

		if(databaseRoomCode === roomCode) 
			throw new UnauthorizedError("O administrador da sala não pode criar perguntas em sua própria sala");

		const createdQuestion = await this.questionRepository.store(roomCode, questionEntity.questionDescription, userId);

		await this.addCache(roomCode);
		
		return createdQuestion;
	}
}